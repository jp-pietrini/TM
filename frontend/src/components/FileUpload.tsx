import React, { useRef, useState } from 'react';

export interface FileUploadProps {
  /**
   * Type of file upload ('profile-photo' | 'portfolio')
   */
  uploadType: 'profile-photo' | 'portfolio';

  /**
   * Accept multiple files (only for portfolio uploads)
   */
  multiple?: boolean;

  /**
   * Maximum number of files (for multiple uploads)
   */
  maxFiles?: number;

  /**
   * Callback when upload is successful
   */
  onUploadSuccess?: (files: UploadedFile[]) => void;

  /**
   * Callback when upload fails
   */
  onUploadError?: (error: string) => void;

  /**
   * Custom button text
   */
  buttonText?: string;

  /**
   * Show upload progress
   */
  showProgress?: boolean;
}

export interface UploadedFile {
  url: string;
  key: string;
  width: number;
  height: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  uploadType,
  multiple = false,
  maxFiles = 10,
  onUploadSuccess,
  onUploadError,
  buttonText,
  showProgress = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // Validate number of files
    if (multiple && files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file types
    const invalidFiles = files.filter(
      (file) => !file.type.startsWith('image/')
    );

    if (invalidFiles.length > 0) {
      setError('Only image files are allowed');
      return;
    }

    // Validate file sizes (10MB max)
    const oversizedFiles = files.filter((file) => file.size > 10 * 1024 * 1024);

    if (oversizedFiles.length > 0) {
      setError('Maximum file size is 10MB');
      return;
    }

    setSelectedFiles(files);
    setError(null);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();

      if (uploadType === 'profile-photo') {
        formData.append('photo', selectedFiles[0]);
      } else {
        selectedFiles.forEach((file) => {
          formData.append('images', file);
        });
      }

      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication required. Please login.');
      }

      // Simulate progress (since we don't have real progress from axios)
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch(
        `http://localhost:3000/api/upload/${uploadType}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();

      // Handle response based on upload type
      let uploadedFiles: UploadedFile[];

      if (uploadType === 'profile-photo') {
        uploadedFiles = [data.data];
      } else {
        uploadedFiles = data.data.uploaded || [];
      }

      // Clear selected files
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Call success callback
      if (onUploadSuccess) {
        onUploadSuccess(uploadedFiles);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Upload failed. Please try again.';
      setError(errorMessage);

      if (onUploadError) {
        onUploadError(errorMessage);
      }
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getButtonText = () => {
    if (buttonText) return buttonText;
    if (uploadType === 'profile-photo') return 'Upload Profile Photo';
    return 'Upload Portfolio Images';
  };

  return (
    <div className="file-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={uploading}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Uploading...' : getButtonText()}
        </button>

        {selectedFiles.length > 0 && !uploading && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              {selectedFiles.length} file(s) selected
            </p>
            <ul className="text-sm text-gray-500 list-disc pl-5">
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleUpload}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Confirm Upload
            </button>
          </div>
        )}

        {showProgress && uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-sky-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
