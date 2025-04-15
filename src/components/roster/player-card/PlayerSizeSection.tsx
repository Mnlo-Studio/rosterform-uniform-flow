
import React from 'react';
import SizeSelect from './SizeSelect';
import GenderSelect from './GenderSelect';

interface PlayerSizeSectionProps {
  playerId: string;
  size: string;
  gender: string;
  onSizeChange: (value: string) => void;
  onGenderChange: (value: string) => void;
}

const PlayerSizeSection: React.FC<PlayerSizeSectionProps> = ({
  playerId,
  size,
  gender,
  onSizeChange,
  onGenderChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SizeSelect
        id={`size-${playerId}`}
        label="Size"
        value={size}
        onChange={onSizeChange}
      />
      <GenderSelect
        id={`gender-${playerId}`}
        value={gender}
        onChange={onGenderChange}
      />
    </div>
  );
};

export default PlayerSizeSection;
