#!/usr/bin/env python3
"""
High-Resolution Image Downloader & Processor for Wild Dooars Tours & Travels.
"""

import io
import os
import sys
import time
from pathlib import Path
import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)

IMAGE_MAP = {
    "package_rhino_gallery1.jpg": "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80",
    "package_grand_gallery2.jpg": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    "dest_gorumara.jpg": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
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
    img.save(buf, "JPEG", quality=35, optimize=True, progressive=True)
    target_path.write_bytes(buf.getvalue())
    return target_path.stat().st_size

def main():
    for filename, url in IMAGE_MAP.items():
        out_file = OUT / filename
        try:
            size = optimize(url, out_file)
            print(f"✓ Saved {filename} ({round(size/1024, 1)} KB)")
        except Exception as e:
            print(f"✗ Failed {filename}: {e}")

if __name__ == "__main__":
    main()
