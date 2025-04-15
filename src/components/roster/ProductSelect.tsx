
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Product } from '@/types';

interface ProductSelectProps {
  productId: string | undefined;
  products: Product[];
  onValueChange: (productId: string | undefined) => void;
  placeholder?: string;
  triggerClassName?: string;
  id?: string;
  disabled?: boolean;
}

const ProductSelect: React.FC<ProductSelectProps> = ({
  productId,
  products,
  onValueChange,
  placeholder = 'Select product',
  triggerClassName = '',
  id,
  disabled = false
}) => {
  // Reset value if selected product no longer exists
  React.useEffect(() => {
    if (productId && products.length > 0 && !products.some(p => p.id === productId)) {
      onValueChange(undefined);
    }
  }, [products, productId, onValueChange]);
  
  return (
    <Select
      value={productId || ''}
      onValueChange={(value) => onValueChange(value || undefined)}
      disabled={disabled || products.length === 0}
    >
      <SelectTrigger 
        id={id}
        className={triggerClassName}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {products.map(product => (
          <SelectItem key={product.id} value={product.id}>
            {product.name || 'Unnamed Product'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProductSelect;
