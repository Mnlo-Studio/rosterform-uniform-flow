
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/calculations';

interface ProductInfo {
  name: string;
  pricePerItem: number;
  notes: string;
  images: string[];
}

interface ProductInfoCardProps {
  productInfo: ProductInfo;
  isEditMode: boolean;
  onProductInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductInfoCard: React.FC<ProductInfoCardProps> = ({
  productInfo,
  isEditMode,
  onProductInfoChange
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Product Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input 
              id="name"
              name="name"
              value={productInfo.name}
              onChange={onProductInfoChange}
              disabled={!isEditMode}
            />
          </div>
          <div>
            <Label htmlFor="pricePerItem">Price Per Item</Label>
            <Input 
              id="pricePerItem"
              name="pricePerItem"
              value={productInfo.pricePerItem.toString()}
              onChange={onProductInfoChange}
              disabled={!isEditMode}
              type="number"
              step="0.01"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Input 
            id="notes"
            name="notes"
            value={productInfo.notes}
            onChange={onProductInfoChange}
            disabled={!isEditMode}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInfoCard;
