
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUploadBox from '@/components/ImageUploadBox';

interface OrderImagesCardProps {
  images: string[];
  onImageUpload?: (index: number, base64: string) => void;
  onImageRemove?: (index: number) => void;
}

const OrderImagesCard: React.FC<OrderImagesCardProps> = ({
  images,
  onImageUpload,
  onImageRemove
}) => {
  // Ensure we have 4 image slots by filling with empty strings if needed
  const productImages = [...images];
  while (productImages.length < 4) {
    productImages.push('');
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Product Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productImages.map((image, index) => (
            <ImageUploadBox
              key={index}
              imageSrc={image || undefined}
              onImageUpload={onImageUpload ? (base64) => onImageUpload(index, base64) : undefined}
              onRemove={image && onImageRemove ? () => onImageRemove(index) : undefined}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderImagesCard;
