
import React from 'react';
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

  return (
    <div className="mb-4">
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
