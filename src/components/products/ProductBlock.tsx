
import React from 'react';
import { Product } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import ImageUploadBox from '../ImageUploadBox';

interface ProductBlockProps {
  product: Product;
  onUpdate: (id: string, data: Partial<Product>) => void;
  onRemove: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
  index: number;
}

const ProductBlock: React.FC<ProductBlockProps> = ({
  product,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  index
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'pricePerItem') {
      // Convert to number and handle invalid inputs
      const numericValue = parseFloat(value);
      onUpdate(product.id, { 
        [name]: isNaN(numericValue) ? 0 : numericValue 
      });
    } else {
      onUpdate(product.id, { [name]: value });
    }
  };

  const handleImageUpload = (base64: string) => {
    const newImages = [...product.images, base64];
    onUpdate(product.id, { images: newImages });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    onUpdate(product.id, { images: newImages });
  };

  // Prepare empty slots for images
  const imageSlots = Array(4).fill(null);
  product.images.forEach((img, index) => {
    imageSlots[index] = img;
  });

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-800">
          Product {index + 1}
        </CardTitle>
        <div className="flex space-x-1">
          {onMoveUp && !isFirst && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onMoveUp(product.id)}
              className="h-8 w-8"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          )}
          {onMoveDown && !isLast && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onMoveDown(product.id)}
              className="h-8 w-8"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(product.id)}
            className="h-8 w-8 text-gray-500 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-sm font-medium mb-3 text-gray-700">Upload Product Images</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imageSlots.map((img, index) => (
              <ImageUploadBox
                key={index}
                imageSrc={img}
                onImageUpload={handleImageUpload}
                onRemove={img ? () => handleRemoveImage(index) : undefined}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor={`productName-${product.id}`}>Product Name*</Label>
            <Input
              id={`productName-${product.id}`}
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Custom Basketball Jersey"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`pricePerItem-${product.id}`}>Price Per Item*</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input
                id={`pricePerItem-${product.id}`}
                name="pricePerItem"
                type="number"
                min="0"
                step="0.01"
                value={product.pricePerItem}
                onChange={handleInputChange}
                className="pl-7"
                placeholder="45.00"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <Label htmlFor={`notes-${product.id}`}>Notes</Label>
          <Textarea
            id={`notes-${product.id}`}
            name="notes"
            value={product.notes}
            onChange={handleInputChange}
            placeholder="Additional information about this product..."
            className="h-24 border border-neutral-200 rounded-md"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBlock;
