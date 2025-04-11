
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ToolbarHeaderProps {
  onApplyChanges: () => void;
}

const ToolbarHeader: React.FC<ToolbarHeaderProps> = ({ onApplyChanges }) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-md font-medium text-gray-700">Bulk Options</h3>
      <Button 
        onClick={onApplyChanges} 
        size="sm" 
        className="bg-green-600 hover:bg-green-700"
      >
        <Check size={16} className="mr-1" />
        Apply
      </Button>
    </div>
  );
};

export default ToolbarHeader;
