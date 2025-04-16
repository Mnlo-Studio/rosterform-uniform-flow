
import React from 'react';
import { Player, Product } from '@/types';
import PlayerTextField from './PlayerTextField';
import PlayerSizeSection from './PlayerSizeSection';
import SizeSelect from './SizeSelect';
import ProductSelect from '../ProductSelect';

interface PlayerFormFieldsProps {
  player: Player;
  showName: boolean;
  showNumber: boolean;
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
  products: Product[];
  onInputChange: (id: string, field: keyof Player, value: string) => void;
  onSelectChange: (id: string, field: keyof Player, value: string) => void;
  onProductChange: (productId: string | undefined) => void;
}

const PlayerFormFields: React.FC<PlayerFormFieldsProps> = ({
  player,
  showName,
  showNumber,
  showShortsSize,
  showSockSize,
  showInitials,
  products,
  onInputChange,
  onSelectChange,
  onProductChange
}) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {showName && (
        <PlayerTextField
          id={`name-${player.id}`}
          label="Name"
          value={player.name}
          onChange={(e) => onInputChange(player.id, 'name', e.target.value)}
          placeholder="Player name"
        />
      )}
      
      {showNumber && (
        <PlayerTextField
          id={`number-${player.id}`}
          label="Number"
          value={player.number}
          onChange={(e) => onInputChange(player.id, 'number', e.target.value)}
          placeholder="#"
        />
      )}
      
      <PlayerSizeSection
        playerId={player.id}
        size={player.size}
        gender={player.gender}
        onSizeChange={(value) => onSelectChange(player.id, 'size', value)}
        onGenderChange={(value) => onSelectChange(player.id, 'gender', value)}
      />
      
      <div>
        <label htmlFor={`product-${player.id}`} className="text-xs font-medium text-gray-700 mb-1 block">
          Product
        </label>
        <ProductSelect
          id={`product-${player.id}`}
          productId={player.productId}
          products={products}
          onValueChange={(value) => onProductChange(value)}
          triggerClassName="h-9"
        />
      </div>
      
      {showShortsSize && (
        <SizeSelect
          id={`shorts-${player.id}`}
          label="Shorts Size"
          value={player.shortsSize || ''}
          onChange={(value) => onSelectChange(player.id, 'shortsSize', value)}
        />
      )}
      
      {showSockSize && (
        <SizeSelect
          id={`socks-${player.id}`}
          label="Sock Size"
          value={player.sockSize || ''}
          onChange={(value) => onSelectChange(player.id, 'sockSize', value)}
        />
      )}
      
      {showInitials && (
        <PlayerTextField
          id={`initials-${player.id}`}
          label="Initials"
          value={player.initials || ''}
          onChange={(e) => onInputChange(player.id, 'initials', e.target.value)}
          placeholder="ABC"
          maxLength={3}
        />
      )}
    </div>
  );
};

export default PlayerFormFields;
