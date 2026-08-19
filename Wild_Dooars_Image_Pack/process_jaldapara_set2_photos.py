#!/usr/bin/env python3
"""
Processes 5 additional real Jaldapara National Park user uploaded photos:
1. Eagle / Forest Raptor perched on tree
2. Sambar Deer with grand antlers
3. Asian Elephant on jungle trail
4. Jaldapara National Park Main Arch Gate
5. Wild Elephant herd crossing safari path
"""

import io
from pathlib import Path
from PIL import Image, ImageOps

UPLOADED_DIR = Path("/Users/debanjanamin/.gemini/antigravity/brain/0bc060df-4aa9-4cad-bf67-0109b9bd64fe/.user_uploaded")
TARGET_DIR = Path("/Users/debanjanamin/Desktop/works/Wild dooars/public/images")
TARGET_DIR.mkdir(parents=True, exist_ok=True)

BIRD_SRC = UPLOADED_DIR / "media_1787167809048.jpg"
SAMBAR_SRC = UPLOADED_DIR / "media_1787167809071.jpg"
ELEPHANT1_SRC = UPLOADED_DIR / "media_1787167809082.jpg"
GATE_SRC = UPLOADED_DIR / "media_1787167809083.jpg"
HERD_SRC = UPLOADED_DIR / "media_1787167809086.jpg"

def process_and_save_jpeg(src_path, dest_path, width=1200, height=800):
    if not src_path.exists():
        print(f"✗ Source file missing: {src_path}")
        return
    img = Image.open(src_path).convert("RGB")
    img = ImageOps.fit(img, (width, height), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=88, optimize=True)
    dest_path.write_bytes(buf.getvalue())
    print(f"✓ Processed & saved {dest_path.name} ({round(dest_path.stat().st_size/1024, 1)} KB)")

# 1. Main Arch Gate -> jaldapara_gate.jpg
process_and_save_jpeg(GATE_SRC, TARGET_DIR / "jaldapara_gate.jpg")

# 2. Asian Elephant & Herd -> wildlife_elephant.jpg & jaldapara_gallery_herd.jpg
process_and_save_jpeg(ELEPHANT1_SRC, TARGET_DIR / "wildlife_elephant.jpg")
process_and_save_jpeg(HERD_SRC, TARGET_DIR / "jaldapara_gallery_herd.jpg")

# 3. Sambar Deer -> jaldapara_gallery_sambar.jpg
process_and_save_jpeg(SAMBAR_SRC, TARGET_DIR / "jaldapara_gallery_sambar.jpg")

# 4. Eagle / Avian Life -> wildlife_hornbill.jpg & jaldapara_gallery_bird.jpg
process_and_save_jpeg(BIRD_SRC, TARGET_DIR / "wildlife_hornbill.jpg")
process_and_save_jpeg(BIRD_SRC, TARGET_DIR / "jaldapara_gallery_bird.jpg")

print("Done processing set 2 Jaldapara National Park photos!")
