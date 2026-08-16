#!/usr/bin/env python3
"""
High-Definition Wildlife Sourcing Script for Wild Dooars.
Downloads 6 authentic species photos from Wikimedia Commons / High-Res sources,
crops to 1200x800 px, and compresses to under 300 KB.
"""

import io
import time
from pathlib import Path
import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "wildlife"
OUT.mkdir(parents=True, exist_ok=True)

# Direct High-Resolution Wikimedia Commons & Unsplash Wildlife Sources
HIGH_RES_FAUNA = {
    "wildlife_rhino.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Rhino_at_Jaldapara.jpg/1600px-Rhino_at_Jaldapara.jpg",
        "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80"
    ],
    "wildlife_elephant.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Elephant_safari_at_Jaldapara.jpg/1600px-Elephant_safari_at_Jaldapara.jpg",
        "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80"
    ],
    "wildlife_gaur.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bos_gaurus_in_Kanger_Ghati_National_Park.jpg/1600px-Bos_gaurus_in_Kanger_Ghati_National_Park.jpg",
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    "wildlife_deer.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sambar_Deer_%28Rusa_unicolor%29.jpg/1600px-Sambar_Deer_%28Rusa_unicolor%29.jpg",
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80"
    ],
    "wildlife_peacock.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Peacock_Plumage.jpg/1600px-Peacock_Plumage.jpg",
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
    ],
    "wildlife_hornbill.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Great_Hornbill_%28Buceros_bicornis%29.jpg/1600px-Great_Hornbill_%28Buceros_bicornis%29.jpg",
        "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=80"
    ],
}

HEADERS = {
    "User-Agent": "WildDooarsHighResWildlifeFetcher/1.0 (info@wilddooarstours.com)"
}

def fetch_and_optimize(urls, target_path):
    raw_data = None
    for url in urls:
        try:
            r = requests.get(url, headers=HEADERS, timeout=25)
            if r.status_code == 200:
                raw_data = r.content
                break
        except Exception:
            continue

    if not raw_data:
        raise RuntimeError(f"Could not download image for {target_path.name}")

    img = Image.open(io.BytesIO(raw_data)).convert("RGB")
    img = ImageOps.fit(img, (1200, 800), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))

    for quality in range(88, 38, -4):
        buf = io.BytesIO()
        img.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
        if buf.tell() <= 300 * 1024:
            target_path.write_bytes(buf.getvalue())
            return target_path.stat().st_size

    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=38, optimize=True, progressive=True)
    target_path.write_bytes(buf.getvalue())
    return target_path.stat().st_size

def main():
    print("Downloading High-Definition Species Photography...")
    for filename, urls in HIGH_RES_FAUNA.items():
        out_file = OUT / filename
        try:
            size = fetch_and_optimize(urls, out_file)
            print(f"✓ Saved {filename} ({round(size/1024, 1)} KB)")
        except Exception as e:
            print(f"✗ Error {filename}: {e}")
        time.sleep(0.3)

if __name__ == "__main__":
    main()
