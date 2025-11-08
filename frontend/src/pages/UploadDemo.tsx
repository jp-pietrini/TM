import React, { useState } from 'react';
import { ImageUpload, Card, type UploadResult } from '../components/ui';
import { CheckCircle2 } from 'lucide-react';

export const UploadDemo: React.FC = () => {
  const [profileResult, setProfileResult] = useState<UploadResult | null>(null);
  const [portfolioResult, setPortfolioResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleProfileUpload = (result: UploadResult) => {
    console.log('Profile photo uploaded:', result);
    setProfileResult(result);
    setError('');
  };

  const handlePortfolioUpload = (result: UploadResult) => {
    console.log('Portfolio image uploaded:', result);
    setPortfolioResult(result);
    setError('');
  };

  const handleError = (errorMessage: string) => {
    console.error('Upload error:', errorMessage);
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Image Upload Demo
          </h1>
          <p className="text-gray-600">
            Test the file upload system with drag & drop and preview
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="bg-red-50 border-red-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-red-900">Upload Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Profile Photo Upload */}
        <Card>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Photo Upload
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Upload a square profile photo (max 5MB)
              </p>
            </div>

            <ImageUpload
              uploadType="profile"
              label="Profile Photo"
              maxSizeMB={5}
              onUpload={handleProfileUpload}
              onError={handleError}
            />

            {profileResult && (
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Upload Successful!</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Thumbnail */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Thumbnail</p>
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={profileResult.thumbnail.cdnUrl}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {profileResult.thumbnail.width} × {profileResult.thumbnail.height} px
                      ({Math.round(profileResult.thumbnail.size / 1024)} KB)
                    </p>
                  </div>

                  {/* Full */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Full Size</p>
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={profileResult.full.cdnUrl}
                        alt="Full size"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {profileResult.full.width} × {profileResult.full.height} px
                      ({Math.round(profileResult.full.size / 1024)} KB)
                    </p>
                  </div>
                </div>

                {/* URLs */}
                <div className="space-y-2 pt-2">
                  <p className="text-sm font-medium text-gray-700">CDN URLs:</p>
                  <div className="space-y-1">
                    <div className="bg-gray-50 p-2 rounded text-xs font-mono break-all">
                      Thumbnail: {profileResult.thumbnail.cdnUrl}
                    </div>
                    <div className="bg-gray-50 p-2 rounded text-xs font-mono break-all">
                      Full: {profileResult.full.cdnUrl}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Portfolio Image Upload */}
        <Card>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Portfolio Image Upload
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Upload a portfolio image (max 10MB)
              </p>
            </div>

            <ImageUpload
              uploadType="portfolio"
              label="Portfolio Image"
              maxSizeMB={10}
              onUpload={handlePortfolioUpload}
              onError={handleError}
            />

            {portfolioResult && (
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Upload Successful!</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Thumbnail */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Thumbnail</p>
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={portfolioResult.thumbnail.cdnUrl}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {portfolioResult.thumbnail.width} × {portfolioResult.thumbnail.height} px
                      ({Math.round(portfolioResult.thumbnail.size / 1024)} KB)
                    </p>
                  </div>

                  {/* Medium */}
                  {portfolioResult.medium && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Medium</p>
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={portfolioResult.medium.cdnUrl}
                          alt="Medium"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        {portfolioResult.medium.width} × {portfolioResult.medium.height} px
                        ({Math.round(portfolioResult.medium.size / 1024)} KB)
                      </p>
                    </div>
                  )}

                  {/* Full */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Full Size</p>
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={portfolioResult.full.cdnUrl}
                        alt="Full size"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {portfolioResult.full.width} × {portfolioResult.full.height} px
                      ({Math.round(portfolioResult.full.size / 1024)} KB)
                    </p>
                  </div>
                </div>

                {/* URLs */}
                <div className="space-y-2 pt-2">
                  <p className="text-sm font-medium text-gray-700">CDN URLs:</p>
                  <div className="space-y-1">
                    <div className="bg-gray-50 p-2 rounded text-xs font-mono break-all">
                      Thumbnail: {portfolioResult.thumbnail.cdnUrl}
                    </div>
                    {portfolioResult.medium && (
                      <div className="bg-gray-50 p-2 rounded text-xs font-mono break-all">
                        Medium: {portfolioResult.medium.cdnUrl}
                      </div>
                    )}
                    <div className="bg-gray-50 p-2 rounded text-xs font-mono break-all">
                      Full: {portfolioResult.full.cdnUrl}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Technical Info */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-blue-900">
              Technical Implementation
            </h3>
            <div className="text-xs text-blue-800 space-y-2">
              <p>
                <strong>Profile Photos:</strong> Uploaded as square images, automatically processed into
                thumbnail (200×200) and full (800×800) sizes with 85-90% JPEG quality.
              </p>
              <p>
                <strong>Portfolio Images:</strong> Uploaded with aspect ratio preserved, processed into
                thumbnail (300×200), medium (800×600), and full (1600px wide) sizes with 80-90% JPEG quality.
              </p>
              <p>
                <strong>Storage:</strong> Images are uploaded to AWS S3 and served via CloudFront CDN for
                optimal performance and global delivery.
              </p>
              <p>
                <strong>Features:</strong> Drag & drop support, file validation, upload progress tracking,
                image preview, automatic format conversion to JPEG, and haptic feedback.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
