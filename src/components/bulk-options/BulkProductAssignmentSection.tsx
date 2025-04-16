
import React, { useEffect } from 'react';
import { useRoster } from '@/context/RosterContext';
import ProductSelect from '@/components/roster/ProductSelect';

interface BulkProductAssignmentSectionProps {
  selectedProductId: string;
  onProductSelect: (productId: string) => void;
}

const BulkProductAssignmentSection: React.FC<BulkProductAssignmentSectionProps> = ({ 
  selectedProductId, 
  onProductSelect 
}) => {
  const { productInfo } = useRoster();
  
  // Debug logging
  useEffect(() => {
    console.log('BulkProductAssignmentSection - Products:', productInfo.products);
    console.log('BulkProductAssignmentSection - Selected Product ID:', selectedProductId);
  }, [productInfo.products, selectedProductId]);

  // When products change, select first product if none is selected
  useEffect(() => {
    if (productInfo.products.length > 0 && (!selectedProductId || !productInfo.products.some(p => p.id === selectedProductId))) {
      console.log('Auto-selecting first product:', productInfo.products[0].id);
      onProductSelect(productInfo.products[0].id);
    }
  }, [productInfo.products, selectedProductId, onProductSelect]);

  return (
    <div>
      <p className="text-sm font-medium mb-2">Bulk Product Assignment</p>
      <ProductSelect
        productId={selectedProductId}
        products={productInfo.products}
        onValueChange={onProductSelect}
        placeholder="Select a product to assign"
        triggerClassName="h-10 w-full"
        disabled={productInfo.products.length === 0}
      />
    </div>
  );
};

export default BulkProductAssignmentSection;
