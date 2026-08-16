#!/usr/bin/env python3
"""
Downloads real authentic wildlife photographs for 'Meet the Wild Side of Dooars' section.
"""

import io
import time
from pathlib import Path
import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "wildlife"
OUT.mkdir(parents=True, exist_ok=True)

WILDLIFE_MAP = {
    "wildlife_rhino.jpg": "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80",
    "wildlife_elephant.jpg": "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80",
    "wildlife_gaur.jpg": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    "wildlife_deer.jpg": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    "wildlife_peacock.jpg": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    "wildlife_hornbill.jpg": "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=80",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def optimize(url, target_path):
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
    img.save(buf, "JPEG", quality=34, optimize=True, progressive=True)
    target_path.write_bytes(buf.getvalue())
    return target_path.stat().st_size

def main():
    for filename, url in WILDLIFE_MAP.items():
        target_path = OUT / filename
        try:
            size = optimize(url, target_path)
            print(f"✓ Saved {filename} ({round(size/1024, 1)} KB)")
        except Exception as e:
            print(f"✗ Failed {filename}: {e}")

if __name__ == "__main__":
    main()
