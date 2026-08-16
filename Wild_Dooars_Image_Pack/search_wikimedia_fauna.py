#!/usr/bin/env python3
import requests
import io
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUB_IMG = ROOT / "public" / "images"
OUT = PUB_IMG / "wildlife"

HEADERS = {
    "User-Agent": "WildDooarsWikimediaFauna/1.0 (info@wilddooarstours.com)"
}

def search_and_download(query, target_filename):
    url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrnamespace": 6,
        "gsrlimit": 5,
        "prop": "imageinfo",
        "iiprop": "url",
        "iiurlwidth": 1600,
        "format": "json"
    }
    r = requests.get(url, params=params, headers=HEADERS, timeout=15)
    data = r.json()
    pages = data.get("query", {}).get("pages", {})
    for _, page in pages.items():
        imageinfo = page.get("imageinfo", [])
        if imageinfo:
            img_url = imageinfo[0].get("thumburl") or imageinfo[0].get("url")
            print(f"Found {query} -> {img_url}")
            img_res = requests.get(img_url, headers=HEADERS, timeout=25)
            img = Image.open(io.BytesIO(img_res.content)).convert("RGB")
            img = ImageOps.fit(img, (1200, 800), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
            buf = io.BytesIO()
            img.save(buf, "JPEG", quality=85, optimize=True)
            target_path = OUT / target_filename
            target_path.write_bytes(buf.getvalue())
            print(f"✓ Saved {target_filename} ({round(target_path.stat().st_size/1024, 1)} KB)")
            return True
    return False

search_and_download("Pavo cristatus peacock", "wildlife_peacock.jpg")
search_and_download("Buceros bicornis hornbill", "wildlife_hornbill.jpg")
