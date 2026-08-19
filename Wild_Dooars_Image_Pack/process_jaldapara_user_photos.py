#!/usr/bin/env python3
"""
Processes 5 real Jaldapara National Park user uploaded photos:
1. Hollong Tourist Lodge
2. Torsa/Hollong Riverbed & Tea Gardens
3. Deer crossing safari forest road
4. Indian Bison (Gaur) in Jaldapara forest
5. One-Horned Rhinoceros in green ferns
"""

import io
from pathlib import Path
from PIL import Image, ImageOps

UPLOADED_DIR = Path("/Users/debanjanamin/.gemini/antigravity/brain/0bc060df-4aa9-4cad-bf67-0109b9bd64fe/.user_uploaded")
TARGET_DIR = Path("/Users/debanjanamin/Desktop/works/Wild dooars/public/images")
TARGET_DIR.mkdir(parents=True, exist_ok=True)

LODGE_SRC = UPLOADED_DIR / "media_1787167692796.jpg"
RIVER_SRC = UPLOADED_DIR / "media_1787167692808.jpg"
DEER_SRC = UPLOADED_DIR / "media_1787167692810.jpg"
BISON_SRC = UPLOADED_DIR / "media_1787167692813.jpg"
RHINO_SRC = UPLOADED_DIR / "media_1787167692816.jpg"

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

# 1. Rhino in ferns -> main Rhino photo, Jaldapara destination main, and Wildlife section rhino
process_and_save_jpeg(RHINO_SRC, TARGET_DIR / "package_rhino_main.jpg")
process_and_save_jpeg(RHINO_SRC, TARGET_DIR / "dest_jaldapara.jpg")
process_and_save_jpeg(RHINO_SRC, TARGET_DIR / "wildlife_rhino.jpg")

# 2. Hollong Lodge -> package_rhino_gallery1.jpg
process_and_save_jpeg(LODGE_SRC, TARGET_DIR / "package_rhino_gallery1.jpg")

# 3. Torsa/Hollong River -> package_rhino_gallery2.jpg
process_and_save_jpeg(RIVER_SRC, TARGET_DIR / "package_rhino_gallery2.jpg")

# 4. Deer on safari road -> wildlife_deer.jpg & jaldapara_gallery_deer.jpg
process_and_save_jpeg(DEER_SRC, TARGET_DIR / "wildlife_deer.jpg")
process_and_save_jpeg(DEER_SRC, TARGET_DIR / "jaldapara_gallery_deer.jpg")

# 5. Indian Bison Gaur -> wildlife_gaur.jpg & jaldapara_gallery_gaur.jpg
process_and_save_jpeg(BISON_SRC, TARGET_DIR / "wildlife_gaur.jpg")
process_and_save_jpeg(BISON_SRC, TARGET_DIR / "jaldapara_gallery_gaur.jpg")

print("Done processing all 5 user uploaded Jaldapara National Park photos!")
