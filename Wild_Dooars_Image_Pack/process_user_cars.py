#!/usr/bin/env python3
"""
Processes the 4 user provided car images:
1. Tata Sumo Gold.jpg.avif -> car_sumo.jpg
2. mahindra bolero.jpeg -> car_bolero.jpg
3. suzuki ertiga.jpg.avif -> car_ertiga.jpg
4. toyota innova.jpeg -> car_innova.jpg
"""

import io
from pathlib import Path
from PIL import Image, ImageOps

CARS_DIR = Path("/Users/debanjanamin/Desktop/works/Wild dooars/Wild_Dooars_Image_Pack/cars")
PUBLIC_IMAGES = Path("/Users/debanjanamin/Desktop/works/Wild dooars/public/images")
PUBLIC_IMAGES.mkdir(parents=True, exist_ok=True)

def process_and_save(src_path, filename, width=1200, height=800):
    p = Path(src_path)
    if not p.exists():
        print(f"✗ File missing: {p}")
        return
    img = Image.open(p).convert("RGB")
    img = ImageOps.fit(img, (width, height), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=90, optimize=True)
    bytes_data = buf.getvalue()

    dest = PUBLIC_IMAGES / filename
    dest.write_bytes(bytes_data)
    print(f"✓ Saved {filename} ({round(len(bytes_data)/1024, 1)} KB)")

process_and_save(CARS_DIR / "Tata Sumo Gold.jpg.avif", "car_sumo.jpg")
process_and_save(CARS_DIR / "mahindra bolero.jpeg", "car_bolero.jpg")
process_and_save(CARS_DIR / "suzuki ertiga.jpg.avif", "car_ertiga.jpg")
process_and_save(CARS_DIR / "toyota innova.jpeg", "car_innova.jpg")

print("All 4 car images updated successfully!")
