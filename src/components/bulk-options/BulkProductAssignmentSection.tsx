
import React, { useEffect } from 'react';
import { useRoster } from '@/context/RosterContext';
import ProductSelect from '../roster/ProductSelect';

interface BulkProductAssignmentSectionProps {
  selectedProductId: string;
  onProductSelect: (productId: string) => void;
}

const BulkProductAssignmentSection: React.FC<BulkProductAssignmentSectionProps> = ({
  selectedProductId,
  onProductSelect
}) => {
  const { productInfo, players } = useRoster();

  // Debug logging
  useEffect(() => {
    console.log('BulkProductAssignmentSection - Products:', productInfo.products);
    console.log('BulkProductAssignmentSection - Selected ID:', selectedProductId);
  }, [productInfo.products, selectedProductId]);

  // If we have products but no selection, auto-select the first product
  useEffect(() => {
    if (productInfo.products.length > 0 && !selectedProductId) {
      console.log('Auto-selecting first product');
      onProductSelect(productInfo.products[0].id);
    }
  }, [productInfo.products, selectedProductId, onProductSelect]);

  return (
    <div>
      <label htmlFor="bulkProductSelection" className="text-sm font-medium mb-2 block">
        Bulk Product Assignment
      </label>
      <ProductSelect
        id="bulkProductSelection"
        productId={selectedProductId}
        products={productInfo.products}
        onValueChange={onProductSelect}
        placeholder="Select a product to assign"
        disabled={productInfo.products.length === 0}
      />
    </div>
  );
};

export default BulkProductAssignmentSection;
