
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check, Upload, X } from 'lucide-react';

interface DocumentUploaderProps {
  title: string;
  description?: string;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  title,
  description,
  accept = "image/*,.pdf",
  maxSize = 5, // Default 5MB
  className,
  onUpload,
  onRemove,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);

    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    setFile(selectedFile);
    
    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // For non-image files like PDFs
      setPreview(null);
    }

    // Simulate upload
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      if (onUpload) onUpload(selectedFile);
    }, 1500);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onRemove) onRemove();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("border rounded-lg p-4", className)}>
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="text-sm font-medium mb-2">{title}</div>
      
      {description && <p className="text-gray-500 text-xs mb-3">{description}</p>}

      {!file ? (
        <div 
          onClick={handleClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-center text-gray-500">Click to upload or drag and drop</p>
          <p className="text-xs text-center text-gray-400 mt-1">Max size: {maxSize}MB</p>
        </div>
      ) : (
        <div className="relative">
          {isUploading && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-lg">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full border-2 border-ncba-blue border-t-transparent animate-spin mb-2"></div>
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-3 flex items-center">
            {preview ? (
              <img src={preview} alt="Preview" className="h-16 w-16 object-contain rounded mr-3" />
            ) : (
              <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center mr-3">
                <p className="text-xs text-gray-500">{file.name.split('.').pop()?.toUpperCase()}</p>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {!isUploading && (
                <div className="flex items-center mt-1">
                  <Check className="h-3 w-3 text-ncba-green mr-1" />
                  <span className="text-xs text-ncba-green">Uploaded successfully</span>
                </div>
              )}
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-ncba-red text-xs mt-2">{error}</p>}
    </div>
  );
};

export default DocumentUploader;
