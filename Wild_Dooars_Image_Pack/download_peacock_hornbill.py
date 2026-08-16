#!/usr/bin/env python3
import io
import time
from pathlib import Path
import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUB_IMG = ROOT / "public" / "images"
OUT = PUB_IMG / "wildlife"
OUT.mkdir(parents=True, exist_ok=True)

PEACOCK_HORNBILL_FILES = {
    "wildlife_peacock.jpg": "File:Indian Peacock Pavo cristatus by Dr Raju Kasambe DSCN3217 (1).jpg",
    "wildlife_hornbill.jpg": "File:Great hornbill (Buceros bicornis) male.jpg"
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
    url = get_wikimedia_url(commons_title)
    if not url:
        raise RuntimeError(f"Could not resolve Wikimedia URL for {commons_title}")
    print(f"Downloading {target_name} via {url}...")
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
    for target_name, commons_title in PEACOCK_HORNBILL_FILES.items():
        try:
            size = process_image(target_name, commons_title)
            print(f"✓ Saved {target_name} ({round(size/1024, 1)} KB)")
        except Exception as e:
            print(f"✗ Failed {target_name}: {e}")
        time.sleep(1.0)

if __name__ == "__main__":
    main()
