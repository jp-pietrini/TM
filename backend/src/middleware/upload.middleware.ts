import multer from 'multer';
import { Request } from 'express';
import { ApiError } from './errorHandler';

// File filter for images only
const imageFileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
  }
};

// Memory storage (we'll process and upload to S3)
const storage = multer.memoryStorage();

// Upload configuration for profile photos
export const uploadProfilePhoto = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 1,
  },
}).single('photo');

// Upload configuration for portfolio images (multiple)
export const uploadPortfolioImages = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max per file
    files: 10, // Max 10 images
  },
}).array('images', 10);

// Upload configuration for single portfolio image
export const uploadSinglePortfolioImage = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
    files: 1,
  },
}).single('image');

// Upload configuration for chat media
export const uploadChatMedia = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 1,
  },
}).single('media');

// Generic single file upload
export const uploadSingleFile = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
    files: 1,
  },
}).single('file');

// Generic multiple files upload
export const uploadMultipleFiles = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max per file
    files: 10, // Max 10 files
  },
}).array('files', 10);
