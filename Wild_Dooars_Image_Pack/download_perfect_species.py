#!/usr/bin/env python3
"""
Downloads high-definition, beautiful, authentic photos for:
1. Indian Bison (Gaur)
2. Great Indian Hornbill
3. Indian Peacock
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

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

TARGET_SPECIES = {
    "wildlife_gaur.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Gaur_Bos_gaurus.jpg/1200px-Gaur_Bos_gaurus.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bos_gaurus_in_Kanger_Ghati_National_Park.jpg/1200px-Bos_gaurus_in_Kanger_Ghati_National_Park.jpg",
        "https://images.unsplash.com/photo-1541414779316-956a57545104?auto=format&fit=crop&w=1200&q=80"
    ],
    "wildlife_hornbill.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Great_hornbill_%28Buceros_bicornis%29_male_02.jpg/1200px-Great_hornbill_%28Buceros_bicornis%29_male_02.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Great_Hornbill_Buceros_bicornis_by_Dr_Raju_Kasambe_01.jpg/1200px-Great_Hornbill_Buceros_bicornis_by_Dr_Raju_Kasambe_01.jpg",
        "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?auto=format&fit=crop&w=1200&q=80"
    ],
    "wildlife_peacock.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Peacock_Plumage.jpg/1200px-Peacock_Plumage.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Indian_Peacock_Pavo_cristatus_showing_its_feathers.jpg/1200px-Indian_Peacock_Pavo_cristatus_showing_its_feathers.jpg",
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
    ]
}

def download_best(target_filename, urls):
    target_path = OUT / target_filename
    for url in urls:
        try:
            print(f"Trying download for {target_filename} from {url}...")
            r = requests.get(url, headers=HEADERS, timeout=25)
            if r.status_code == 200 and len(r.content) > 10000:
                img = Image.open(io.BytesIO(r.content)).convert("RGB")
                img = ImageOps.fit(img, (1200, 800), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
                for quality in range(85, 35, -5):
                    buf = io.BytesIO()
                    img.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
                    if buf.tell() <= 300 * 1024:
                        target_path.write_bytes(buf.getvalue())
                        print(f"✓ Saved {target_filename} ({round(target_path.stat().st_size/1024, 1)} KB)")
                        return True
        except Exception as e:
            print(f"  Failed URL {url}: {e}")
            continue
    return False

def main():
    for target_filename, urls in TARGET_SPECIES.items():
        success = download_best(target_filename, urls)
        if not success:
            print(f"✗ Could not download {target_filename}")

if __name__ == "__main__":
    main()
