
import React, { useState } from 'react';
import { useRoster } from '@/context/RosterContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ProductSelect from './ProductSelect';

const BulkProductAssignment: React.FC = () => {
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

  if (productInfo.products.length === 0) {
    return (
      <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-4">
        <p className="text-amber-800 text-sm">
          No products have been added. Add at least one product to assign to players.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-gray-50 p-4 rounded-md mb-4">
      <div className="flex-grow">
        <ProductSelect
          productId={selectedProductId}
          products={productInfo.products}
          onValueChange={(value) => setSelectedProductId(value || '')}
          placeholder="Select a product to assign"
          triggerClassName="h-9"
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
  );
};

export default BulkProductAssignment;
