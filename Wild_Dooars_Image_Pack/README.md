# Wild Dooars Tours & Travels — Image Pack

This pack contains the exact image manifest for the website.

## Important
The environment used to prepare this pack cannot directly transfer binary image files from Wikimedia Commons into the project filesystem, so the included downloader fetches the source files itself through the Wikimedia Commons API.

It will:
- download the exact Commons source for every target filename
- center-crop to 1200×800
- compress JPEGs to 300 KB or less where possible
- create `public/images/ATTRIBUTIONS.csv`
- create `DOWNLOAD_REPORT.txt`

## Run

```bash
pip install requests pillow
python download_images.py
```

After completion, copy/merge:

```text
public/images/
```

into the Wild Dooars React project.

## Licensing

The downloader records the current license and author metadata returned by Wikimedia Commons in `ATTRIBUTIONS.csv`.

Do not remove that attribution record. Several images are under Creative Commons licenses that require attribution and/or ShareAlike. One source (Phuentsholing) is CC0.

## Image manifest

26 target files are defined in `image_manifest.json`.
