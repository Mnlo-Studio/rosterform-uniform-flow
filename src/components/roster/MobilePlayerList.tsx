
import React from 'react';
import { Player } from '@/types';
import PlayerCard from './PlayerCard';

interface MobilePlayerListProps {
  players: Player[];
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
  onRemove: (id: string) => void;
  onInputChange: (id: string, field: keyof Player, value: string) => void;
  onSelectChange: (id: string, field: keyof Player, value: string) => void;
}

const MobilePlayerList: React.FC<MobilePlayerListProps> = ({
  players,
  showShortsSize,
  showSockSize,
  showInitials,
  onRemove,
  onInputChange,
  onSelectChange
}) => {
  if (players.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      {players.map((player, index) => (
        <PlayerCard
          key={player.id}
          player={player}
          index={index}
          showShortsSize={showShortsSize}
          showSockSize={showSockSize}
          showInitials={showInitials}
          onRemove={onRemove}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
        />
      ))}
    </div>
  );
};

export default MobilePlayerList;
