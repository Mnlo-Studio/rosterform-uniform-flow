
import React, { useState } from 'react';
import { useRoster } from '@/context/RosterContext';
import { Button } from '@/components/ui/button';
import ProductSelect from '@/components/roster/ProductSelect';
import { toast } from 'sonner';

const BulkProductAssignmentSection: React.FC = () => {
  const { productInfo, players, bulkAssignProductToPlayers } = useRoster();
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const handleApplyToAll = () => {
    if (!selectedProductId) {
      toast.error('Please select a product first');
      return;
    }
    
    bulkAssignProductToPlayers(selectedProductId);
    toast.success('Product assigned to all players');
  };

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
        <Button 
          onClick={handleApplyToAll}
          disabled={!selectedProductId || players.length === 0}
          className="whitespace-nowrap"
        >
          Apply to All
        </Button>
      </div>
    </div>
  );
};

export default BulkProductAssignmentSection;
