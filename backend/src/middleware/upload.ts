import multer from 'multer';
import { Request } from 'express';

/**
 * Multer configuration for file uploads
 * Uses memory storage to process files before uploading to S3
 */

// File filter to accept only images
const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Accept only image files
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, WebP, GIF) are allowed'));
  }
};

// File filter for documents (for future use)
const documentFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and Word documents are allowed'));
  }
};

/**
 * Multer middleware for single image upload
 * Max file size: 10MB
 */
export const uploadSingleImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: imageFileFilter,
});

/**
 * Multer middleware for multiple image uploads
 * Max 10 files, 10MB each
 */
export const uploadMultipleImages = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 10, // Max 10 files
  },
  fileFilter: imageFileFilter,
});

/**
 * Multer middleware for document uploads
 * Max file size: 20MB
 */
export const uploadDocument = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
  fileFilter: documentFileFilter,
});

/**
 * Multer error handler middleware
 * Catches multer-specific errors and formats them nicely
 */
export function handleMulterError(
  error: any,
  req: Request,
  res: any,
  next: any
): void {
  if (error instanceof multer.MulterError) {
    // Multer-specific errors
    if (error.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        success: false,
        error: 'File too large',
        details: 'Maximum file size is 10MB',
      });
      return;
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      res.status(400).json({
        success: false,
        error: 'Too many files',
        details: 'Maximum 10 files allowed',
      });
      return;
    } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      res.status(400).json({
        success: false,
        error: 'Unexpected file field',
        details: error.message,
      });
      return;
    }
  } else if (error) {
    // Other errors (e.g., file filter rejections)
    res.status(400).json({
      success: false,
      error: 'File upload error',
      details: error.message,
    });
    return;
  }

  next(error);
}
