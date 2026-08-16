#!/usr/bin/env python3
import requests
import io
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUB_IMG = ROOT / "public" / "images"
OUT = PUB_IMG / "wildlife"

HEADERS = {
    "User-Agent": "WildDooarsGaurFetcher/1.0 (info@wilddooarstours.com)"
}

def get_gaur():
    url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": "filetype:bitmap Bos gaurus bison",
        "gsrnamespace": 6,
        "gsrlimit": 10,
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
            print(f"Testing Gaur image: {img_url}")
            try:
                res = requests.get(img_url, headers=HEADERS, timeout=25)
                if res.status_code == 200 and len(res.content) > 10000:
                    img = Image.open(io.BytesIO(res.content)).convert("RGB")
                    img = ImageOps.fit(img, (1200, 800), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
                    buf = io.BytesIO()
                    img.save(buf, "JPEG", quality=85, optimize=True)
                    out_path = OUT / "wildlife_gaur.jpg"
                    out_path.write_bytes(buf.getvalue())
                    print(f"✓ Successfully saved wildlife_gaur.jpg ({round(out_path.stat().st_size/1024, 1)} KB)")
                    return True
            except Exception as e:
                print(f"Error downloading: {e}")
                continue
    return False

if __name__ == "__main__":
    get_gaur()
