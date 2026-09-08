/**
 * Image processing utility for local device photo selection & uploads.
 * Reads File objects, automatically downscales large camera images (to max 1600px)
 * and compresses to high-quality JPEG/WebP base64 strings so they fit cleanly
 * in browser storage and load lightning fast.
 */

export async function processImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image.'));
    }

    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read selected image file.'));

    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse selected image.'));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio downscaling if larger than max bounds
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to raw data url if canvas context unavailable
          return resolve(reader.result as string);
        }

        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Determine best format (prefer webp, fallback to jpeg)
        const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(format, quality);
        resolve(dataUrl);
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}

export async function processMultipleImageFiles(
  files: FileList | File[],
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.82
): Promise<string[]> {
  const fileArray = Array.from(files);
  const results: string[] = [];

  for (const file of fileArray) {
    try {
      const dataUrl = await processImageFile(file, maxWidth, maxHeight, quality);
      results.push(dataUrl);
    } catch (err) {
      console.error('Error processing image:', file.name, err);
    }
  }

  return results;
}
