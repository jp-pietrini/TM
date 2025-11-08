import sharp from 'sharp';

export interface ImageResizeOptions {
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  quality?: number;
}

export interface ProcessedImage {
  buffer: Buffer;
  width: number;
  height: number;
  format: string;
  size: number;
}

/**
 * Resize and optimize an image
 */
export async function resizeImage(
  buffer: Buffer,
  options: ImageResizeOptions = {}
): Promise<ProcessedImage> {
  const {
    width,
    height,
    fit = 'cover',
    quality = 85,
  } = options;

  const image = sharp(buffer);

  // Resize if dimensions provided
  if (width || height) {
    image.resize(width, height, { fit });
  }

  // Convert to JPEG and optimize
  const processed = await image
    .jpeg({ quality, progressive: true })
    .toBuffer({ resolveWithObject: true });

  return {
    buffer: processed.data,
    width: processed.info.width,
    height: processed.info.height,
    format: processed.info.format,
    size: processed.info.size,
  };
}

/**
 * Create multiple sizes of an image (thumbnail, medium, large)
 */
export async function createImageSizes(buffer: Buffer): Promise<{
  thumbnail: ProcessedImage;
  medium: ProcessedImage;
  large: ProcessedImage;
  original: ProcessedImage;
}> {
  const [thumbnail, medium, large, original] = await Promise.all([
    resizeImage(buffer, { width: 150, height: 150, fit: 'cover', quality: 80 }),
    resizeImage(buffer, { width: 500, height: 500, fit: 'inside', quality: 85 }),
    resizeImage(buffer, { width: 1200, height: 1200, fit: 'inside', quality: 90 }),
    resizeImage(buffer, { width: 2000, fit: 'inside', quality: 90 }),
  ]);

  return { thumbnail, medium, large, original };
}

/**
 * Process profile photo (square, optimized)
 */
export async function processProfilePhoto(buffer: Buffer): Promise<{
  thumbnail: ProcessedImage;
  full: ProcessedImage;
}> {
  const [thumbnail, full] = await Promise.all([
    resizeImage(buffer, { width: 200, height: 200, fit: 'cover', quality: 85 }),
    resizeImage(buffer, { width: 800, height: 800, fit: 'cover', quality: 90 }),
  ]);

  return { thumbnail, full };
}

/**
 * Process portfolio image (landscape optimized)
 */
export async function processPortfolioImage(buffer: Buffer): Promise<{
  thumbnail: ProcessedImage;
  medium: ProcessedImage;
  full: ProcessedImage;
}> {
  const [thumbnail, medium, full] = await Promise.all([
    resizeImage(buffer, { width: 300, height: 200, fit: 'cover', quality: 80 }),
    resizeImage(buffer, { width: 800, height: 600, fit: 'inside', quality: 85 }),
    resizeImage(buffer, { width: 1600, fit: 'inside', quality: 90 }),
  ]);

  return { thumbnail, medium, full };
}

/**
 * Validate image file
 */
export async function validateImage(buffer: Buffer): Promise<{
  valid: boolean;
  error?: string;
  metadata?: sharp.Metadata;
}> {
  try {
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Check if it's a valid image format
    const allowedFormats = ['jpeg', 'jpg', 'png', 'webp'];
    if (!metadata.format || !allowedFormats.includes(metadata.format)) {
      return {
        valid: false,
        error: `Invalid format. Allowed: ${allowedFormats.join(', ')}`,
      };
    }

    // Check dimensions (max 10000x10000)
    if (metadata.width && metadata.width > 10000) {
      return { valid: false, error: 'Image width too large (max 10000px)' };
    }
    if (metadata.height && metadata.height > 10000) {
      return { valid: false, error: 'Image height too large (max 10000px)' };
    }

    return {
      valid: true,
      metadata,
    };
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid or corrupt image file',
    };
  }
}
