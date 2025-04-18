
import React, { useEffect } from 'react';
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
  onValueChange: (productId: string) => void;
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
  // Debug logging
  useEffect(() => {
    console.log('ProductSelect - Products:', products);
    console.log('ProductSelect - Current Product ID:', productId);
  }, [products, productId]);
  
  // If no product selected but products are available, don't auto-select
  // Let the user or parent component handle the selection explicitly
  
  const actualValue = productId && products.some(p => p.id === productId) ? productId : '';

  return (
    <Select
      value={actualValue}
      onValueChange={onValueChange}
      disabled={disabled || products.length === 0}
    >
      <SelectTrigger 
        id={id}
        className={triggerClassName}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent align="start" className="bg-white z-50">
        {products.length === 0 ? (
          <SelectItem value="no-products" disabled>No products available</SelectItem>
        ) : (
          products.map(product => (
            <SelectItem key={product.id} value={product.id}>
              {product.name || 'Unnamed Product'}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default ProductSelect;
