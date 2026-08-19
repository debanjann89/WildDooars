#!/usr/bin/env python3
"""
Processes user uploaded logo and 3 real Jayanti riverbed photos.
"""

import shutil
import io
from pathlib import Path
from PIL import Image, ImageOps

UPLOADED_DIR = Path("/Users/debanjanamin/.gemini/antigravity/brain/0bc060df-4aa9-4cad-bf67-0109b9bd64fe/.user_uploaded")
TARGET_DIR = Path("/Users/debanjanamin/Desktop/works/Wild dooars/public/images")
TARGET_DIR.mkdir(parents=True, exist_ok=True)

# 1. Primary Logo
LOGO_SRC = UPLOADED_DIR / "media_1787166307291.png"
LOGO_DEST = TARGET_DIR / "logo.png"

if LOGO_SRC.exists():
    shutil.copy2(LOGO_SRC, LOGO_DEST)
    print(f"✓ Copied primary logo to {LOGO_DEST} ({round(LOGO_DEST.stat().st_size/1024, 1)} KB)")

# 2. Jayanti Photos
JAYANTI_MAIN_SRC = UPLOADED_DIR / "media_1787166312592.jpg"
JAYANTI_GAL1_SRC = UPLOADED_DIR / "media_1787166312598.jpg"
JAYANTI_GAL2_SRC = UPLOADED_DIR / "media_1787166312618.jpg"

def process_and_save_jpeg(src_path, dest_path, width=1200, height=800):
    if not src_path.exists():
        print(f"✗ Source file does not exist: {src_path}")
        return
    img = Image.open(src_path).convert("RGB")
    img = ImageOps.fit(img, (width, height), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=88, optimize=True)
    dest_path.write_bytes(buf.getvalue())
    print(f"✓ Processed & saved {dest_path.name} ({round(dest_path.stat().st_size/1024, 1)} KB)")

# Main Jayanti photo -> package_buxa_main.jpg and dest_buxa.jpg
process_and_save_jpeg(JAYANTI_MAIN_SRC, TARGET_DIR / "package_buxa_main.jpg")
process_and_save_jpeg(JAYANTI_MAIN_SRC, TARGET_DIR / "dest_buxa.jpg")

# Gallery photos -> package_buxa_gallery1.jpg and package_buxa_gallery2.jpg
process_and_save_jpeg(JAYANTI_GAL1_SRC, TARGET_DIR / "package_buxa_gallery1.jpg")
process_and_save_jpeg(JAYANTI_GAL2_SRC, TARGET_DIR / "package_buxa_gallery2.jpg")

print("Done processing user uploaded logo and Jayanti photos!")
