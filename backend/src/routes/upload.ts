import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middleware/auth';
import { uploadSingleImage, uploadMultipleImages } from '../middleware/upload';
import { validateImage, processImage } from '../utils/imageProcessing';
import { uploadToS3, deleteFromS3, extractS3KeyFromUrl } from '../utils/s3';
import { sendSuccess, sendError } from '../utils/response';

const router = Router();

/**
 * Upload profile photo
 * POST /api/upload/profile-photo
 * Protected route - requires authentication
 */
router.post(
  '/profile-photo',
  authenticate,
  uploadSingleImage.single('photo'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        sendError(res, 'No file uploaded', 400);
        return;
      }

      // Validate image
      const validation = await validateImage(req.file.buffer, {
        maxSizeBytes: 10 * 1024 * 1024, // 10MB
        minWidth: 150,
        minHeight: 150,
        maxWidth: 5000,
        maxHeight: 5000,
        allowedFormats: ['jpeg', 'jpg', 'png', 'webp'],
      });

      if (!validation.valid) {
        sendError(res, validation.error || 'Invalid image', 400);
        return;
      }

      // Process image (resize and optimize)
      const processed = await processImage(req.file.buffer, {
        maxWidth: 800,
        maxHeight: 800,
        quality: 90,
        format: 'jpeg',
      });

      // Upload to S3
      const userId = req.user!.userId;
      const result = await uploadToS3(
        processed.buffer,
        processed.mimeType,
        'profile-photos',
        `user-${userId}-${Date.now()}`
      );

      sendSuccess(
        res,
        {
          url: result.cdnUrl,
          key: result.key,
          width: processed.width,
          height: processed.height,
        },
        'Profile photo uploaded successfully',
        201
      );
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Upload portfolio images
 * POST /api/upload/portfolio
 * Protected route - requires authentication
 * Accepts multiple images (max 10)
 */
router.post(
  '/portfolio',
  authenticate,
  uploadMultipleImages.array('images', 10),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if files were uploaded
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        sendError(res, 'No files uploaded', 400);
        return;
      }

      const userId = req.user!.userId;
      const uploadedFiles: any[] = [];
      const errors: string[] = [];

      // Process and upload each file
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];

        try {
          // Validate image
          const validation = await validateImage(file.buffer, {
            maxSizeBytes: 10 * 1024 * 1024,
            minWidth: 300,
            minHeight: 300,
            maxWidth: 5000,
            maxHeight: 5000,
            allowedFormats: ['jpeg', 'jpg', 'png', 'webp'],
          });

          if (!validation.valid) {
            errors.push(`File ${i + 1}: ${validation.error}`);
            continue;
          }

          // Process image
          const processed = await processImage(file.buffer, {
            maxWidth: 2000,
            maxHeight: 2000,
            quality: 90,
            format: 'jpeg',
          });

          // Upload to S3
          const result = await uploadToS3(
            processed.buffer,
            processed.mimeType,
            'portfolios',
            `user-${userId}-${Date.now()}-${i}`
          );

          uploadedFiles.push({
            url: result.cdnUrl,
            key: result.key,
            width: processed.width,
            height: processed.height,
          });
        } catch (error: any) {
          errors.push(`File ${i + 1}: ${error.message || 'Upload failed'}`);
        }
      }

      // Return results
      if (uploadedFiles.length === 0) {
        sendError(
          res,
          'No files were successfully uploaded',
          400,
          errors.length > 0 ? { errors } : undefined
        );
        return;
      }

      sendSuccess(
        res,
        {
          uploaded: uploadedFiles,
          errors: errors.length > 0 ? errors : undefined,
        },
        `Successfully uploaded ${uploadedFiles.length} of ${req.files.length} files`,
        201
      );
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Delete uploaded file
 * DELETE /api/upload/:folder/:filename
 * Protected route - requires authentication
 * Only allows users to delete their own files
 */
router.delete(
  '/:folder/:filename',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { folder, filename } = req.params;
      const userId = req.user!.userId;

      // Construct S3 key
      const key = `${folder}/${filename}`;

      // Verify the file belongs to the user (check filename contains user ID)
      if (!filename.includes(`user-${userId}`)) {
        sendError(res, 'You can only delete your own files', 403);
        return;
      }

      // Verify folder is allowed
      const allowedFolders = ['profile-photos', 'portfolios'];
      if (!allowedFolders.includes(folder)) {
        sendError(res, 'Invalid folder', 400);
        return;
      }

      // Delete from S3
      await deleteFromS3(key);

      sendSuccess(res, { deleted: key }, 'File deleted successfully');
    } catch (error: any) {
      if (error.name === 'NoSuchKey') {
        sendError(res, 'File not found', 404);
        return;
      }
      next(error);
    }
  }
);

/**
 * Delete file by URL
 * DELETE /api/upload/by-url
 * Protected route - requires authentication
 * Only allows users to delete their own files
 */
router.delete(
  '/by-url',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { url } = req.body;

      if (!url || typeof url !== 'string') {
        sendError(res, 'URL is required', 400);
        return;
      }

      // Extract S3 key from URL
      const key = extractS3KeyFromUrl(url);
      if (!key) {
        sendError(res, 'Invalid URL format', 400);
        return;
      }

      const userId = req.user!.userId;

      // Verify the file belongs to the user
      if (!key.includes(`user-${userId}`)) {
        sendError(res, 'You can only delete your own files', 403);
        return;
      }

      // Delete from S3
      await deleteFromS3(key);

      sendSuccess(res, { deleted: key }, 'File deleted successfully');
    } catch (error: any) {
      if (error.name === 'NoSuchKey') {
        sendError(res, 'File not found', 404);
        return;
      }
      next(error);
    }
  }
);

export default router;
