
import React, { useState } from 'react';
import { useRoster } from '@/context/RosterContext';
import ProductSelect from '@/components/roster/ProductSelect';

const BulkProductAssignmentSection: React.FC = () => {
  const { productInfo, players, bulkAssignProductToPlayers } = useRoster();
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  // Automatically apply product when selected
  React.useEffect(() => {
    if (selectedProductId && players.length > 0) {
      bulkAssignProductToPlayers(selectedProductId);
    }
  }, [selectedProductId, players, bulkAssignProductToPlayers]);

  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2">Bulk Product Assignment</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <ProductSelect
            productId={selectedProductId}
            products={productInfo.products}
            onValueChange={(value) => setSelectedProductId(value || '')}
            placeholder="Select a product to assign"
            triggerClassName="h-10"
            disabled={players.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default BulkProductAssignmentSection;
