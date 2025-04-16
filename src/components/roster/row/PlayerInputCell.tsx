
import React from 'react';
import { Input } from '@/components/ui/input';
import { Player } from '@/types';

interface PlayerInputCellProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  field: keyof Player;
  maxLength?: number;
}

const PlayerInputCell: React.FC<PlayerInputCellProps> = ({
  value,
  onChange,
  placeholder,
  maxLength,
}) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="h-8"
    />
  );
};

export default PlayerInputCell;
