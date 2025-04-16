
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface PlayerCardHeaderProps {
  index: number;
  isSelected?: boolean;
  onRemove: () => void;
  onToggleSelect?: () => void;
}

const PlayerCardHeader: React.FC<PlayerCardHeaderProps> = ({ 
  index, 
  isSelected = false,
  onRemove,
  onToggleSelect
}) => {
  return (
    <div className="flex items-center justify-between mb-3 pb-2 border-b">
      <div className="flex items-center gap-2">
        {onToggleSelect && (
          <Checkbox 
            checked={isSelected} 
            onCheckedChange={onToggleSelect} 
            aria-label={`Select player ${index + 1}`}
          />
        )}
        <span className="font-medium text-gray-700">Player #{index + 1}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="h-8 w-8 text-gray-500 hover:text-red-500"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

export default PlayerCardHeader;
