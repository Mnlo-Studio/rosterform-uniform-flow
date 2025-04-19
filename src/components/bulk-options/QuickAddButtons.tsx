
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface QuickAddButtonsProps {
  onSelectQuickAdd: (count: number) => void;
  selectedCount: number | null;
}

const QuickAddButtons: React.FC<QuickAddButtonsProps> = ({
  onSelectQuickAdd,
  selectedCount
}) => {
  const handleQuickAddChange = (value: string) => {
    console.log('Quick add selected:', value);
    // Convert the string value to a number
    const numValue = value ? parseInt(value, 10) : 0;
    onSelectQuickAdd(numValue);
  };

  // Format the display value for the select
  const getDisplayValue = () => {
    if (!selectedCount) return '';
    return selectedCount.toString();
  };

  return (
    <div>
      <label htmlFor="quickAddDropdown" className="text-sm font-medium mb-2 block">
        Quick Add Players
      </label>
      <Select 
        value={getDisplayValue()} 
        onValueChange={handleQuickAddChange}
      >
        <SelectTrigger id="quickAddDropdown" className="w-full">
          <SelectValue placeholder="Add Players" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">
            <div className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add 1 Player
            </div>
          </SelectItem>
          <SelectItem value="5">
            <div className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add 5 Players
            </div>
          </SelectItem>
          <SelectItem value="10">
            <div className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add 10 Players
            </div>
          </SelectItem>
          <SelectItem value="25">
            <div className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add 25 Players
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default QuickAddButtons;
