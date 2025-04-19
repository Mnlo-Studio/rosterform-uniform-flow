
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
        disabled={players.length === 0 && productInfo.products.length === 0}
      />
    </div>
  );
};

export default BulkProductAssignmentSection;
