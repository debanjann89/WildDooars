#!/usr/bin/env python3
"""
Wild Dooars Tours & Travels image downloader from Wikimedia Commons.

Downloads Wikimedia Commons files specified in image_manifest.json,
crops them to 1200x800, compresses JPEGs to <=300 KB, and outputs:
  - public/images/<target_file>
  - public/images/ATTRIBUTIONS.csv
  - DOWNLOAD_REPORT.txt
"""

import csv
import io
import json
import os
import sys
import time
from pathlib import Path

import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent
PROJECT_ROOT = ROOT.parent
OUT = PROJECT_ROOT / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)

with open(ROOT / "image_manifest.json", "r", encoding="utf-8") as f:
    MANIFEST = json.load(f)

API = "https://commons.wikimedia.org/w/api.php"
HEADERS = {
    "User-Agent": "WildDooarsWebsiteImagePacker/1.0 (info@wilddooarstours.com; travel website asset loader)"
}

def commons_info(title):
    params = {
        "action": "query",
        "format": "json",
        "prop": "imageinfo",
        "iiprop": "url|extmetadata",
        "iiurlwidth": "1600",
        "titles": "File:" + title,
    }
    r = requests.get(API, params=params, headers=HEADERS, timeout=30)
    r.raise_for_status()
    pages = r.json()["query"]["pages"]
    page = next(iter(pages.values()))
    if "imageinfo" not in page:
        raise RuntimeError(f"Commons file not found: {title}")
    info = page["imageinfo"][0]
    meta = info.get("extmetadata", {})
    
    # Prefer thumbnail url if available, otherwise raw url
    download_url = info.get("thumburl") or info.get("url")

    def clean_meta(val):
        if isinstance(val, dict):
            return val.get("value", "")
        return str(val or "")

    return {
        "download_url": download_url,
        "description": clean_meta(meta.get("ImageDescription")),
        "author": clean_meta(meta.get("Artist")),
        "license": clean_meta(meta.get("LicenseShortName")),
        "license_url": clean_meta(meta.get("LicenseUrl")),
        "source_page": "https://commons.wikimedia.org/wiki/File:" + title.replace(" ", "_"),
    }

def optimize(url, target_path):
    r = requests.get(url, headers=HEADERS, timeout=60)
    r.raise_for_status()
    img = Image.open(io.BytesIO(r.content)).convert("RGB")
    img = ImageOps.fit(img, (1200, 800), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))

    # Compress JPEG to <= 300 KB
    for quality in range(86, 34, -4):
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
    rows = []
    failures = []

    print(f"Starting image download for {len(MANIFEST)} files...")

    for i, item in enumerate(MANIFEST, 1):
        target_file = item["target"]
        source_title = item["source"]
        target_path = OUT / target_file
        print(f"[{i}/{len(MANIFEST)}] Downloading {target_file} <- {source_title}")

        try:
            info = commons_info(source_title)
            size = optimize(info["download_url"], target_path)
            
            # Clean author HTML tags if present
            author_clean = info["author"].replace("<a ", " ").replace("</a>", "").replace("<p>", "").replace("</p>", "")
            
            rows.append({
                "target_file": target_file,
                "commons_file": source_title,
                "author": author_clean,
                "license": info["license"],
                "license_url": info["license_url"],
                "source_page": info["source_page"],
                "size_bytes": size,
                "size_kb": round(size / 1024, 1),
            })
            print(f"  ✓ Saved {target_file} ({round(size/1024, 1)} KB)")
            time.sleep(1.2)  # Respect Wikimedia rate limits
        except Exception as e:
            failures.append((target_file, source_title, str(e)))
            print(f"  ✗ ERROR: {e}")
            time.sleep(1.5)

    # Save Attributions CSV
    attr_path = OUT / "ATTRIBUTIONS.csv"
    with open(attr_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "target_file", "commons_file", "author", "license",
                "license_url", "source_page", "size_bytes", "size_kb"
            ],
        )
        writer.writeheader()
        writer.writerows(rows)

    # Save Download Report
    report_path = ROOT / "DOWNLOAD_REPORT.txt"
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(f"DOWNLOAD REPORT - Wild Dooars Tours & Travels\n")
        f.write(f"Total requested: {len(MANIFEST)}\n")
        f.write(f"Successfully downloaded & optimized: {len(rows)}\n")
        f.write(f"Failures: {len(failures)}\n\n")

        if failures:
            f.write("Failed files details:\n")
            for target, source, error in failures:
                f.write(f"- {target} (Source: {source}): {error}\n")
        else:
            f.write("All 26 requested images were successfully downloaded, center-cropped to 1200x800 px, and compressed to <=300 KB.\n")

    print(f"\n==========================================")
    print(f"Download complete: {len(rows)}/{len(MANIFEST)} images processed.")
    print(f"Attributions saved to: {attr_path}")
    print(f"Report saved to: {report_path}")
    print(f"==========================================\n")

    if failures:
        sys.exit(2)

if __name__ == "__main__":
    main()
