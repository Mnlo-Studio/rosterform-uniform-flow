
import React, { useState, useRef } from 'react';
import { Image, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadBoxProps {
  onImageUpload: (base64: string) => void;
  imageSrc?: string;
  onRemove?: () => void;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ 
  onImageUpload, 
  imageSrc, 
  onRemove 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className={cn(
        "relative w-full h-40 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors",
        isDragging ? "border-primary-500 bg-blue-50" : "border-neutral-200 hover:border-primary-400",
        imageSrc ? "border-solid" : "border-dashed"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={imageSrc ? undefined : handleClick}
    >
      {imageSrc ? (
        <>
          <img 
            src={imageSrc} 
            alt="Uploaded product" 
            className="w-full h-full object-cover rounded-md"
          />
          <button 
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 border border-neutral-200"
            onClick={(e) => {
              e.stopPropagation();
              if (onRemove) onRemove();
            }}
          >
            <X size={16} className="text-gray-600" />
          </button>
        </>
      ) : (
        <>
          <Image size={24} className="text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Upload</span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </>
      )}
    </div>
  );
};

export default ImageUploadBox;
