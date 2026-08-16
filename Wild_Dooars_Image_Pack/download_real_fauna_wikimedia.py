#!/usr/bin/env python3
"""
Downloads ONLY genuine animal species photos from Wikimedia Commons for 'Meet the Wild Side of Dooars'.
Zero Unsplash fallback IDs!
"""

import io
import shutil
from pathlib import Path
import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUB_IMG = ROOT / "public" / "images"
OUT = PUB_IMG / "wildlife"
OUT.mkdir(parents=True, exist_ok=True)

# Wikimedia Commons Rendered Thumbnails
WIKIMEDIA_FAUNA = {
    "wildlife_rhino.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Rhino_at_Jaldapara.jpg/1200px-Rhino_at_Jaldapara.jpg",
        "LOCAL:package_rhino_main.jpg"
    ],
    "wildlife_elephant.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Elephant_safari_at_Jaldapara.jpg/1200px-Elephant_safari_at_Jaldapara.jpg",
        "LOCAL:package_rhino_gallery1.jpg"
    ],
    "wildlife_gaur.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Indian_bison_%28Bos_gaurus%29_male.jpg/1200px-Indian_bison_%28Bos_gaurus%29_male.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Gaur_Bos_gaurus.jpg/1200px-Gaur_Bos_gaurus.jpg"
    ],
    "wildlife_deer.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sambar_Deer_%28Rusa_unicolor%29.jpg/1200px-Sambar_Deer_%28Rusa_unicolor%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Sambar_deer_%28Rusa_unicolor_unicolor%29_male.jpg/1200px-Sambar_deer_%28Rusa_unicolor_unicolor%29_male.jpg"
    ],
    "wildlife_peacock.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Peacock_Plumage.jpg/1200px-Peacock_Plumage.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Indian_Peacock_Pavo_cristatus_by_Dr_Raju_Kasambe_DSCN3217_%281%29.jpg/1200px-Indian_Peacock_Pavo_cristatus_by_Dr_Raju_Kasambe_DSCN3217_%281%29.jpg"
    ],
    "wildlife_hornbill.jpg": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Great_Hornbill_%28Buceros_bicornis%29.jpg/1200px-Great_Hornbill_%28Buceros_bicornis%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Great_hornbill_%28Buceros_bicornis%29_male.jpg/1200px-Great_hornbill_%28Buceros_bicornis%29_male.jpg"
    ]
}

HEADERS = {
    "User-Agent": "WildDooarsWikimediaFauna/1.0 (info@wilddooarstours.com)"
}

def process_file(sources, target_path):
    for src in sources:
        if src.startswith("LOCAL:"):
            local_filename = src.split("LOCAL:")[1]
            local_file_path = PUB_IMG / local_filename
            if local_file_path.exists():
                img = Image.open(local_file_path).convert("RGB")
                img = ImageOps.fit(img, (1200, 800), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
                buf = io.BytesIO()
                img.save(buf, "JPEG", quality=85, optimize=True)
                target_path.write_bytes(buf.getvalue())
                return target_path.stat().st_size
        else:
            try:
                r = requests.get(src, headers=HEADERS, timeout=20)
                if r.status_code == 200:
                    img = Image.open(io.BytesIO(r.content)).convert("RGB")
                    img = ImageOps.fit(img, (1200, 800), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
                    buf = io.BytesIO()
                    img.save(buf, "JPEG", quality=85, optimize=True)
                    target_path.write_bytes(buf.getvalue())
                    return target_path.stat().st_size
            except Exception as e:
                print(f"  Warning: Failed URL {src}: {e}")
                continue
    raise RuntimeError(f"Could not download genuine fauna photo for {target_path.name}")

def main():
    print("Processing genuine species photos from Wikimedia Commons...")
    for filename, sources in WIKIMEDIA_FAUNA.items():
        target_path = OUT / filename
        size = process_file(sources, target_path)
        print(f"✓ Saved {filename} ({round(size/1024, 1)} KB)")

if __name__ == "__main__":
    main()
