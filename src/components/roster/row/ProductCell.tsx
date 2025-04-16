
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import ProductSelect from '../ProductSelect';
import { Player } from '@/types';

interface ProductCellProps {
  playerId: string;
}

const ProductCell: React.FC<ProductCellProps> = ({ playerId }) => {
  const { productInfo, assignProductToPlayer, players } = useRoster();
  
  // Find the player to get their current productId
  const player = players.find(p => p.id === playerId);
  
  const handleProductChange = (productId: string | undefined) => {
    assignProductToPlayer(playerId, productId);
  };

  return (
    <ProductSelect
      productId={player?.productId}
      products={productInfo.products}
      onValueChange={handleProductChange}
      triggerClassName="h-8"
    />
  );
};

export default ProductCell;
