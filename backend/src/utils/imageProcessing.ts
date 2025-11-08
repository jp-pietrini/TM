import sharp from 'sharp';

export interface ImageProcessingOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export interface ProcessedImage {
  buffer: Buffer;
  mimeType: string;
  width: number;
  height: number;
}

/**
 * Process and optimize an image
 * - Resize if larger than max dimensions
 * - Convert to specified format (defaults to jpeg)
 * - Compress with specified quality
 * @param buffer Original image buffer
 * @param options Processing options
 * @returns Processed image buffer and metadata
 */
export async function processImage(
  buffer: Buffer,
  options: ImageProcessingOptions = {}
): Promise<ProcessedImage> {
  const {
    maxWidth = 2000,
    maxHeight = 2000,
    quality = 85,
    format = 'jpeg',
  } = options;

  // Process image
  let image = sharp(buffer);

  // Get metadata
  const metadata = await image.metadata();

  // Resize if needed (maintains aspect ratio)
  if (metadata.width && metadata.height) {
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      image = image.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
  }

  // Convert and compress
  if (format === 'jpeg') {
    image = image.jpeg({ quality, mozjpeg: true });
  } else if (format === 'png') {
    image = image.png({ quality, compressionLevel: 9 });
  } else if (format === 'webp') {
    image = image.webp({ quality });
  }

  // Get processed buffer and metadata
  const processedBuffer = await image.toBuffer();
  const processedMetadata = await sharp(processedBuffer).metadata();

  return {
    buffer: processedBuffer,
    mimeType: `image/${format}`,
    width: processedMetadata.width || 0,
    height: processedMetadata.height || 0,
  };
}

/**
 * Create multiple sizes of an image (thumbnail, medium, large)
 */
export async function createImageVariants(
  buffer: Buffer
): Promise<{
  thumbnail: ProcessedImage;
  medium: ProcessedImage;
  large: ProcessedImage;
}> {
  const [thumbnail, medium, large] = await Promise.all([
    processImage(buffer, { maxWidth: 150, maxHeight: 150, quality: 80 }),
    processImage(buffer, { maxWidth: 500, maxHeight: 500, quality: 85 }),
    processImage(buffer, { maxWidth: 2000, maxHeight: 2000, quality: 90 }),
  ]);

  return { thumbnail, medium, large };
}

/**
 * Validate image file
 * Checks file type and dimensions
 */
export async function validateImage(
  buffer: Buffer,
  options: {
    maxSizeBytes?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    allowedFormats?: string[];
  } = {}
): Promise<{ valid: boolean; error?: string }> {
  const {
    maxSizeBytes = 10 * 1024 * 1024, // 10MB default
    minWidth = 0,
    minHeight = 0,
    maxWidth = 5000,
    maxHeight = 5000,
    allowedFormats = ['jpeg', 'jpg', 'png', 'webp'],
  } = options;

  // Check file size
  if (buffer.length > maxSizeBytes) {
    return {
      valid: false,
      error: `Image size exceeds maximum of ${maxSizeBytes / 1024 / 1024}MB`,
    };
  }

  try {
    // Get image metadata
    const metadata = await sharp(buffer).metadata();

    // Check format
    if (!metadata.format || !allowedFormats.includes(metadata.format)) {
      return {
        valid: false,
        error: `Image format must be one of: ${allowedFormats.join(', ')}`,
      };
    }

    // Check dimensions
    if (metadata.width && metadata.height) {
      if (metadata.width < minWidth || metadata.height < minHeight) {
        return {
          valid: false,
          error: `Image dimensions must be at least ${minWidth}x${minHeight}px`,
        };
      }

      if (metadata.width > maxWidth || metadata.height > maxHeight) {
        return {
          valid: false,
          error: `Image dimensions must not exceed ${maxWidth}x${maxHeight}px`,
        };
      }
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid image file or corrupted image data',
    };
  }
}
