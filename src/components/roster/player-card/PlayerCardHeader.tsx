
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface PlayerCardHeaderProps {
  index: number;
  onRemove: () => void;
}

const PlayerCardHeader: React.FC<PlayerCardHeaderProps> = ({
  index,
  onRemove
}) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-medium text-gray-800">Player {index + 1}</h3>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-red-500"
        onClick={onRemove}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

export default PlayerCardHeader;
