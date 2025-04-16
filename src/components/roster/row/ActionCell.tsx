
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface ActionCellProps {
  onRemove: () => void;
}

const ActionCell: React.FC<ActionCellProps> = ({ onRemove }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onRemove}
      className="h-8 w-8 text-gray-500 hover:text-red-500"
    >
      <Trash2 size={16} />
    </Button>
  );
};

export default ActionCell;
