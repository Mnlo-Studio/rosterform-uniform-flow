
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
  const { productInfo, players } = useRoster();
  
  useEffect(() => {
    // Debug logging
    console.log('BulkProductAssignmentSection - Products:', productInfo.products);
    console.log('BulkProductAssignmentSection - Selected Product ID:', selectedProductId);
  }, [productInfo.products, selectedProductId]);

  return (
    <div>
      <p className="text-sm font-medium mb-2">Bulk Product Assignment</p>
      <ProductSelect
        productId={selectedProductId}
        products={productInfo.products}
        onValueChange={(value) => onProductSelect(value || '')}
        placeholder="Select a product to assign"
        triggerClassName="h-10 w-full"
        disabled={players.length === 0}
      />
    </div>
  );
};

export default BulkProductAssignmentSection;
