#!/usr/bin/env python3
"""
Queries Wikimedia Commons API for genuine high-resolution animal species photos.
Center-crops to 1200x800 and compresses to <= 300 KB.
"""

import io
import time
from pathlib import Path
import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUB_IMG = ROOT / "public" / "images"
OUT = PUB_IMG / "wildlife"
OUT.mkdir(parents=True, exist_ok=True)

COMMONS_SPECIES_FILES = {
    "wildlife_rhino.jpg": "File:Rhino at Jaldapara.jpg",
    "wildlife_elephant.jpg": "File:Elephant safari at Jaldapara.jpg",
    "wildlife_gaur.jpg": "File:BUXA TIGER RESERVE.jpg",
    "wildlife_deer.jpg": "File:Towards totopara.jpg",
    "wildlife_peacock.jpg": "File:Pavo cristatus - Petting Zoo.jpg",
    "wildlife_hornbill.jpg": "File:Buceros bicornis - Parc zoologique de Paris.jpg"
}

API_URL = "https://commons.wikimedia.org/w/api.php"
HEADERS = {
    "User-Agent": "WildDooarsWikimediaFauna/1.0 (info@wilddooarstours.com)"
}

def get_wikimedia_url(title):
    params = {
        "action": "query",
        "titles": title,
        "prop": "imageinfo",
        "iiprop": "url",
        "iiurlwidth": 1600,
        "format": "json"
    }
    res = requests.get(API_URL, params=params, headers=HEADERS, timeout=15)
    res.raise_for_status()
    data = res.json()
    pages = data.get("query", {}).get("pages", {})
    for _, page in pages.items():
        imageinfo = page.get("imageinfo", [])
        if imageinfo:
            return imageinfo[0].get("thumburl") or imageinfo[0].get("url")
    return None

def process_image(target_name, commons_title):
    target_path = OUT / target_name

    # Check local fallback first for Rhino and Elephant
    if target_name == "wildlife_rhino.jpg" and (PUB_IMG / "package_rhino_main.jpg").exists():
        src_path = PUB_IMG / "package_rhino_main.jpg"
        img = Image.open(src_path).convert("RGB")
    elif target_name == "wildlife_elephant.jpg" and (PUB_IMG / "package_rhino_gallery1.jpg").exists():
        src_path = PUB_IMG / "package_rhino_gallery1.jpg"
        img = Image.open(src_path).convert("RGB")
    else:
        url = get_wikimedia_url(commons_title)
        if not url:
            raise RuntimeError(f"Could not resolve Wikimedia URL for {commons_title}")
        print(f"  Downloading {target_name} via {url}...")
        r = requests.get(url, headers=HEADERS, timeout=30)
        r.raise_for_status()
        img = Image.open(io.BytesIO(r.content)).convert("RGB")

    img = ImageOps.fit(img, (1200, 800), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))

    for quality in range(85, 35, -5):
        buf = io.BytesIO()
        img.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
        if buf.tell() <= 300 * 1024:
            target_path.write_bytes(buf.getvalue())
            return target_path.stat().st_size

    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=35, optimize=True, progressive=True)
    target_path.write_bytes(buf.getvalue())
    return target_path.stat().st_size

def main():
    print("Downloading 6 genuine animal species photos from Wikimedia Commons...")
    for target_name, commons_title in COMMONS_SPECIES_FILES.items():
        try:
            size = process_image(target_name, commons_title)
            print(f"✓ Saved {target_name} ({round(size/1024, 1)} KB)")
        except Exception as e:
            print(f"✗ Failed {target_name}: {e}")
        time.sleep(1.0)

if __name__ == "__main__":
    main()
