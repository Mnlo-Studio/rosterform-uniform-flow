
import { useState, useEffect } from 'react';
import { useRoster } from '@/context/RosterContext';

export const useProductSelection = () => {
  const { productInfo } = useRoster();
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  
  // Reset selectedProductId if it's no longer in the products list
  useEffect(() => {
    if (productInfo.products.length > 0) {
      // If selectedProductId doesn't exist in products, select first product
      if (selectedProductId && !productInfo.products.some(p => p.id === selectedProductId)) {
        console.log('Selected product no longer exists, selecting first product');
        setSelectedProductId(productInfo.products[0].id);
      } 
      // If no product is selected and products exist, select first product
      else if (!selectedProductId) {
        console.log('No product selected, selecting first product');
        setSelectedProductId(productInfo.products[0].id);
      }
    } else {
      // Clear selection if no products exist
      if (selectedProductId) {
        setSelectedProductId('');
      }
    }
  }, [productInfo.products, selectedProductId]);

  const handleProductSelection = (productId: string) => {
    console.log('Product selected in handler:', productId);
    setSelectedProductId(productId);
  };

  return {
    selectedProductId,
    handleProductSelection
  };
};
