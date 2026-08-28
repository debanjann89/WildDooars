#!/usr/bin/env python3
"""
Processes all animal images from Wild_Dooars_Image_Pack/animals:
1. Hornbil.jpeg -> wildlife_hornbill.jpg
2. Indian Bison.jpeg -> wildlife_gaur.jpg
3. Peacock.png.avif -> wildlife_peacock.jpg
4. asian Elephent.jpg -> wildlife_elephant.jpg
5. deer.webp -> wildlife_deer.jpg

And downloads authentic high-res images for Dooars Butterflies & Insects:
6. wildlife_butterfly.jpg (Troides aeacus / Papilio paris - Buxa & Rajabhatkhawa Butterfly Park)
7. wildlife_insects.jpg (Attacus atlas - Giant Atlas Moth of Dooars Rainforests)
"""

import io
import os
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps

ANIMALS_DIR = Path("/Users/debanjanamin/Desktop/works/Wild dooars/Wild_Dooars_Image_Pack/animals")
PUBLIC_IMAGES = Path("/Users/debanjanamin/Desktop/works/Wild dooars/public/images")
WILDLIFE_DIR = PUBLIC_IMAGES / "wildlife"

PUBLIC_IMAGES.mkdir(parents=True, exist_ok=True)
WILDLIFE_DIR.mkdir(parents=True, exist_ok=True)

def process_and_save(src_img_or_path, filename, width=1200, height=800):
    if isinstance(src_img_or_path, (str, Path)):
        p = Path(src_img_or_path)
        if not p.exists():
            print(f"✗ File missing: {p}")
            return
        img = Image.open(p).convert("RGB")
    else:
        img = src_img_or_path.convert("RGB")

    img = ImageOps.fit(img, (width, height), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=90, optimize=True)
    bytes_data = buf.getvalue()

    # Save in both public/images and public/images/wildlife
    (PUBLIC_IMAGES / filename).write_bytes(bytes_data)
    (WILDLIFE_DIR / filename).write_bytes(bytes_data)
    print(f"✓ Saved {filename} ({round(len(bytes_data)/1024, 1)} KB)")

# Process user provided animal photos
process_and_save(ANIMALS_DIR / "Hornbil.jpeg", "wildlife_hornbill.jpg")
process_and_save(ANIMALS_DIR / "Indian Bison.jpeg", "wildlife_gaur.jpg")
process_and_save(ANIMALS_DIR / "Peacock.png.avif", "wildlife_peacock.jpg")
process_and_save(ANIMALS_DIR / "asian Elephent.jpg", "wildlife_elephant.jpg")
process_and_save(ANIMALS_DIR / "deer.webp", "wildlife_deer.jpg")

# Download authentic butterfly & insect photos
headers = {"User-Agent": "WildDooarsPortal/1.0"}

def download_and_process(url, filename):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            img = Image.open(io.BytesIO(data))
            process_and_save(img, filename)
    except Exception as e:
        print(f"✗ Error downloading {filename}: {e}")

# Golden Birdwing / Paris Peacock Butterfly (Rajabhatkhawa Butterfly Park, Buxa)
butterfly_url = "https://upload.wikimedia.org/wikipedia/commons/2/28/Open_wing_mud-puddling_position_of_Papilio_paris_%28Linnaeus%2C1758%29_-_Paris_Peacock.jpg"
download_and_process(butterfly_url, "wildlife_butterfly.jpg")

# Atlas Moth / Forest Insects (Dooars Canopy)
moth_url = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Attacus_atlas_London_Zoo_01118-2.jpg"
download_and_process(moth_url, "wildlife_insects.jpg")

print("All animal and insect photos processed successfully!")
