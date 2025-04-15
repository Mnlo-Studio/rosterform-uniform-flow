
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUploadBox from './ImageUploadBox';

const ProductInfoForm: React.FC = () => {
  const { productInfo, updateProductInfo, addImage, removeImage } = useRoster();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'pricePerItem') {
      // Convert to number and handle invalid inputs
      const numericValue = parseFloat(value);
      updateProductInfo({ 
        [name]: isNaN(numericValue) ? 0 : numericValue 
      });
    } else {
      updateProductInfo({ [name]: value });
    }
  };

  const handleImageUpload = (base64: string) => {
    addImage(base64);
  };

  const handleRemoveImage = (index: number) => {
    removeImage(index);
  };

  // Prepare empty slots for images
  const imageSlots = Array(4).fill(null);
  productInfo.images.forEach((img, index) => {
    imageSlots[index] = img;
  });

  // Get the product name label based on product type
  const getProductNameLabel = () => {
    switch(productInfo.productType) {
      case 'jerseys':
        return 'Jersey Name*';
      case 'equipment':
        return 'Equipment Name*';
      default:
        return 'Product Name*';
    }
  };

  // Get the product placeholder based on product type
  const getProductPlaceholder = () => {
    switch(productInfo.productType) {
      case 'jerseys':
        return 'Team Jerseys';
      case 'equipment':
        return 'Team Equipment';
      default:
        return 'Custom Product';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Product Info</CardTitle>
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
            <Label htmlFor="productName">{getProductNameLabel()}</Label>
            <Input
              id="productName"
              name="name"
              value={productInfo.name}
              onChange={handleInputChange}
              placeholder={getProductPlaceholder()}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pricePerItem">Price Per Item*</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input
                id="pricePerItem"
                name="pricePerItem"
                type="number"
                min="0"
                step="0.01"
                value={productInfo.pricePerItem}
                onChange={handleInputChange}
                className="pl-7"
                placeholder="45.00"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={productInfo.notes}
            onChange={handleInputChange}
            placeholder="Additional information about this product..."
            className="h-24 border border-neutral-200 rounded-md"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInfoForm;
