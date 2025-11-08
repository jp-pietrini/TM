import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'trustme-uploads-production';
const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL || 'https://d2v5hpvkahmvq5.cloudfront.net';

export interface UploadResult {
  key: string;
  url: string;
  cdnUrl: string;
}

/**
 * Upload a file to S3
 * @param buffer File buffer
 * @param mimeType File MIME type
 * @param folder Folder in S3 bucket (e.g., 'profile-photos', 'portfolios')
 * @param filename Optional custom filename (without extension)
 * @returns Upload result with S3 key and URLs
 */
export async function uploadToS3(
  buffer: Buffer,
  mimeType: string,
  folder: string,
  filename?: string
): Promise<UploadResult> {
  // Generate unique filename
  const extension = getExtensionFromMimeType(mimeType);
  const uniqueFilename = filename || uuidv4();
  const key = `${folder}/${uniqueFilename}.${extension}`;

  // Upload to S3
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
    // Allow public read access
    ACL: 'public-read',
  });

  await s3Client.send(command);

  // Return URLs
  const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  const cdnUrl = `${CLOUDFRONT_URL}/${key}`;

  return {
    key,
    url,
    cdnUrl,
  };
}

/**
 * Delete a file from S3
 * @param key S3 object key
 */
export async function deleteFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Get file extension from MIME type
 */
function getExtensionFromMimeType(mimeType: string): string {
  const mimeMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'application/pdf': 'pdf',
  };

  return mimeMap[mimeType] || 'bin';
}

/**
 * Extract S3 key from URL
 * Works with both direct S3 URLs and CloudFront URLs
 */
export function extractS3KeyFromUrl(url: string): string | null {
  // Handle CloudFront URLs
  if (url.includes(CLOUDFRONT_URL)) {
    return url.replace(`${CLOUDFRONT_URL}/`, '');
  }

  // Handle direct S3 URLs
  const s3Pattern = new RegExp(`https://${BUCKET_NAME}.s3.[^/]+.amazonaws.com/(.+)`);
  const match = url.match(s3Pattern);
  return match ? match[1] : null;
}
