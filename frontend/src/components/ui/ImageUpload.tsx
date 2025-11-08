import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { haptics } from '../../utils/haptics';

export interface ImageUploadProps {
  /**
   * Called when an image is successfully uploaded
   */
  onUpload?: (result: UploadResult) => void;

  /**
   * Called when upload fails
   */
  onError?: (error: string) => void;

  /**
   * Upload endpoint type
   */
  uploadType?: 'profile' | 'portfolio';

  /**
   * Whether to allow multiple file selection
   */
  multiple?: boolean;

  /**
   * Maximum file size in MB
   */
  maxSizeMB?: number;

  /**
   * Current image URL for preview (for editing existing images)
   */
  currentImageUrl?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Label text
   */
  label?: string;
}

export interface UploadResult {
  thumbnail: ImageSize;
  full: ImageSize;
  medium?: ImageSize;
}

interface ImageSize {
  url: string;
  cdnUrl: string;
  key: string;
  width: number;
  height: number;
  size: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  onError,
  uploadType = 'profile',
  multiple = false,
  maxSizeMB = 5,
  currentImageUrl,
  className = '',
  label,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPEG, PNG, and WebP images are allowed';
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
  };

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files: FileList) => {
    const fileArray = Array.from(files);

    // Validate files
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        haptics.error();
        onError?.(error);
        return;
      }
    }

    // Create previews
    const previewUrls = await Promise.all(fileArray.map(createPreview));
    setPreviews(previewUrls);

    // Upload files
    await uploadFiles(fileArray);
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();

      if (multiple) {
        // Multiple files
        files.forEach((file) => {
          formData.append('images', file);
        });
      } else {
        // Single file
        const fieldName = uploadType === 'profile' ? 'photo' : 'image';
        formData.append(fieldName, files[0]);
      }

      const endpoint = multiple
        ? '/api/upload/portfolio-images'
        : uploadType === 'profile'
        ? '/api/upload/profile-photo'
        : '/api/upload/portfolio-image';

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();

      setUploadProgress(100);
      haptics.success();

      if (result.success) {
        onUpload?.(result.data);
      }
    } catch (error) {
      haptics.error();
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      onError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleClearPreviews = () => {
    haptics.tap();
    setPreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    haptics.tap();
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragging
            ? 'border-sky-500 bg-sky-50 scale-[1.02]'
            : 'border-gray-300 hover:border-sky-400 hover:bg-gray-50'
          }
          ${isUploading ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-3">
            <Loader2 className="w-12 h-12 text-sky-500 mx-auto animate-spin" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Uploading... {uploadProgress}%
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">
                {isDragging ? 'Drop your image here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500">
                JPEG, PNG, or WebP (max {maxSizeMB}MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      {(previews.length > 0 || currentImageUrl) && !isUploading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Preview</p>
            {previews.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearPreviews}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {previews.length > 0 ? (
              previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : currentImageUrl ? (
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={currentImageUrl}
                  alt="Current"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
