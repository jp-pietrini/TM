import express from 'express';
import { authenticate } from '../middleware/auth';
import { uploadProfilePhoto, uploadSinglePortfolioImage, uploadPortfolioImages } from '../middleware/upload.middleware';
import { validateImage, processProfilePhoto, processPortfolioImage } from '../utils/image.utils';
import { uploadToS3 } from '../utils/s3';
import { sendSuccess, sendError } from '../utils/response';
import { asyncHandler } from '../middleware/errorHandler';
import { uploadLimiter } from '../middleware/rateLimiter';

const router = express.Router();

/**
 * POST /api/upload/profile-photo
 * Upload a profile photo
 */
router.post(
  '/profile-photo',
  authenticate,
  uploadLimiter,
  uploadProfilePhoto,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return sendError(res, 400, 'No file uploaded');
    }

    // Validate image
    const validation = await validateImage(req.file.buffer);
    if (!validation.valid) {
      return sendError(res, 400, validation.error || 'Invalid image');
    }

    // Process image (create thumbnail and full size)
    const { thumbnail, full } = await processProfilePhoto(req.file.buffer);

    // Upload both sizes to S3
    const [thumbnailResult, fullResult] = await Promise.all([
      uploadToS3(
        thumbnail.buffer,
        'image/jpeg',
        'profile-photos',
        `thumbnail-${Date.now()}`
      ),
      uploadToS3(
        full.buffer,
        'image/jpeg',
        'profile-photos',
        `full-${Date.now()}`
      ),
    ]);

    return sendSuccess(res, {
      thumbnail: {
        url: thumbnailResult.url,
        cdnUrl: thumbnailResult.cdnUrl,
        key: thumbnailResult.key,
        width: thumbnail.width,
        height: thumbnail.height,
        size: thumbnail.size,
      },
      full: {
        url: fullResult.url,
        cdnUrl: fullResult.cdnUrl,
        key: fullResult.key,
        width: full.width,
        height: full.height,
        size: full.size,
      },
    }, 'Profile photo uploaded successfully');
  })
);

/**
 * POST /api/upload/portfolio-image
 * Upload a single portfolio image
 */
router.post(
  '/portfolio-image',
  authenticate,
  uploadLimiter,
  uploadSinglePortfolioImage,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return sendError(res, 400, 'No file uploaded');
    }

    // Validate image
    const validation = await validateImage(req.file.buffer);
    if (!validation.valid) {
      return sendError(res, 400, validation.error || 'Invalid image');
    }

    // Process image (create thumbnail, medium, and full size)
    const { thumbnail, medium, full } = await processPortfolioImage(req.file.buffer);

    // Upload all sizes to S3
    const timestamp = Date.now();
    const [thumbnailResult, mediumResult, fullResult] = await Promise.all([
      uploadToS3(
        thumbnail.buffer,
        'image/jpeg',
        'portfolio',
        `thumbnail-${timestamp}`
      ),
      uploadToS3(
        medium.buffer,
        'image/jpeg',
        'portfolio',
        `medium-${timestamp}`
      ),
      uploadToS3(
        full.buffer,
        'image/jpeg',
        'portfolio',
        `full-${timestamp}`
      ),
    ]);

    return sendSuccess(res, {
      thumbnail: {
        url: thumbnailResult.url,
        cdnUrl: thumbnailResult.cdnUrl,
        key: thumbnailResult.key,
        width: thumbnail.width,
        height: thumbnail.height,
        size: thumbnail.size,
      },
      medium: {
        url: mediumResult.url,
        cdnUrl: mediumResult.cdnUrl,
        key: mediumResult.key,
        width: medium.width,
        height: medium.height,
        size: medium.size,
      },
      full: {
        url: fullResult.url,
        cdnUrl: fullResult.cdnUrl,
        key: fullResult.key,
        width: full.width,
        height: full.height,
        size: full.size,
      },
    }, 'Portfolio image uploaded successfully');
  })
);

/**
 * POST /api/upload/portfolio-images
 * Upload multiple portfolio images at once
 */
router.post(
  '/portfolio-images',
  authenticate,
  uploadLimiter,
  uploadPortfolioImages,
  asyncHandler(async (req, res) => {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return sendError(res, 400, 'No files uploaded');
    }

    // Process and upload all images
    const results = await Promise.all(
      files.map(async (file) => {
        // Validate image
        const validation = await validateImage(file.buffer);
        if (!validation.valid) {
          throw new Error(`Invalid image ${file.originalname}: ${validation.error}`);
        }

        // Process image
        const { thumbnail, medium, full } = await processPortfolioImage(file.buffer);

        // Upload all sizes
        const timestamp = Date.now();
        const [thumbnailResult, mediumResult, fullResult] = await Promise.all([
          uploadToS3(
            thumbnail.buffer,
            'image/jpeg',
            'portfolio',
            `thumbnail-${timestamp}`
          ),
          uploadToS3(
            medium.buffer,
            'image/jpeg',
            'portfolio',
            `medium-${timestamp}`
          ),
          uploadToS3(
            full.buffer,
            'image/jpeg',
            'portfolio',
            `full-${timestamp}`
          ),
        ]);

        return {
          originalName: file.originalname,
          thumbnail: {
            url: thumbnailResult.url,
            cdnUrl: thumbnailResult.cdnUrl,
            key: thumbnailResult.key,
            width: thumbnail.width,
            height: thumbnail.height,
            size: thumbnail.size,
          },
          medium: {
            url: mediumResult.url,
            cdnUrl: mediumResult.cdnUrl,
            key: mediumResult.key,
            width: medium.width,
            height: medium.height,
            size: medium.size,
          },
          full: {
            url: fullResult.url,
            cdnUrl: fullResult.cdnUrl,
            key: fullResult.key,
            width: full.width,
            height: full.height,
            size: full.size,
          },
        };
      })
    );

    return sendSuccess(res, {
      images: results,
      count: results.length,
    }, `${results.length} portfolio image(s) uploaded successfully`);
  })
);

export default router;
