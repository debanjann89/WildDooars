#!/usr/bin/env python3
"""
Updates Indian Gaur and Sambar Deer photos:
- indian gaur.jpeg -> wildlife_gaur.jpg & wildlife/wildlife_gaur.jpg
- sambar deer.jpeg -> wildlife_deer.jpg & wildlife/wildlife_deer.jpg
"""

import io
from pathlib import Path
from PIL import Image, ImageOps

ANIMALS_DIR = Path("/Users/debanjanamin/Desktop/works/Wild dooars/Wild_Dooars_Image_Pack/animals")
PUBLIC_IMAGES = Path("/Users/debanjanamin/Desktop/works/Wild dooars/public/images")
WILDLIFE_DIR = PUBLIC_IMAGES / "wildlife"

GAUR_SRC = ANIMALS_DIR / "indian gaur.jpeg"
DEER_SRC = ANIMALS_DIR / "sambar deer.jpeg"

def process_and_save(src_path, dest_paths, width=1200, height=800):
    img = Image.open(src_path).convert("RGB")
    img = ImageOps.fit(img, (width, height), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=92, optimize=True)
    bytes_data = buf.getvalue()

    for dest in dest_paths:
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(bytes_data)
        print(f"✓ Saved {dest.name} ({round(len(bytes_data)/1024, 1)} KB)")

# Save Gaur
process_and_save(GAUR_SRC, [
    PUBLIC_IMAGES / "wildlife_gaur.jpg",
    WILDLIFE_DIR / "wildlife_gaur.jpg"
])

# Save Sambar Deer
process_and_save(DEER_SRC, [
    PUBLIC_IMAGES / "wildlife_deer.jpg",
    WILDLIFE_DIR / "wildlife_deer.jpg"
])

print("Indian Gaur and Sambar Deer images updated successfully!")
