
import React from 'react';
import { Player, Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import PlayerCardHeader from './PlayerCardHeader';
import PlayerFormFields from './PlayerFormFields';

export interface PlayerCardProps {
  player: Player;
  index: number;
  showName: boolean;
  showNumber: boolean;
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
  products: Product[];
  onRemove: (id: string) => void;
  onInputChange: (id: string, field: keyof Player, value: string) => void;
  onSelectChange: (id: string, field: keyof Player, value: string) => void;
  onProductChange: (productId: string | undefined) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  index,
  showName,
  showNumber,
  showShortsSize,
  showSockSize,
  showInitials,
  products,
  onRemove,
  onInputChange,
  onSelectChange,
  onProductChange
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <PlayerCardHeader 
          index={index} 
          onRemove={() => onRemove(player.id)} 
        />
        
        <PlayerFormFields
          player={player}
          showName={showName}
          showNumber={showNumber}
          showShortsSize={showShortsSize}
          showSockSize={showSockSize}
          showInitials={showInitials}
          products={products}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
          onProductChange={onProductChange}
        />
      </CardContent>
    </Card>
  );
};

// Export named component for direct imports
export { PlayerCard as PlayerCardComponent };

// Export default for backward compatibility
export default PlayerCard;
