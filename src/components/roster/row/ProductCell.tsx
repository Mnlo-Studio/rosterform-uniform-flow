
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import ProductSelect from '../ProductSelect';

interface ProductCellProps {
  playerId: string;
}

const ProductCell: React.FC<ProductCellProps> = ({ playerId }) => {
  const { productInfo, assignProductToPlayer } = useRoster();
  
  const handleProductChange = (productId: string | undefined) => {
    assignProductToPlayer(playerId, productId);
  };

  return (
    <ProductSelect
      productId={playerId}
      products={productInfo.products}
      onValueChange={handleProductChange}
      triggerClassName="h-8"
    />
  );
};

export default ProductCell;
