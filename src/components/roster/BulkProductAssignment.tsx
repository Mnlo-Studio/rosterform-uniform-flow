
import React, { useState } from 'react';
import { useRoster } from '@/context/RosterContext';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';

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
        <Select 
          value={selectedProductId} 
          onValueChange={setSelectedProductId}
        >
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select a product to assign" />
          </SelectTrigger>
          <SelectContent>
            {productInfo.products.map(product => (
              <SelectItem key={product.id} value={product.id}>
                {product.name} (${product.pricePerItem})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
