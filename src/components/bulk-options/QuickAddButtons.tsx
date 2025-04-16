
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface QuickAddButtonsProps {
  onSelectQuickAdd: (count: number) => void;
  selectedCount: number | null;
}

const QuickAddButtons: React.FC<QuickAddButtonsProps> = ({ onSelectQuickAdd, selectedCount }) => {
  const quickAddOptions = [
    { count: 1, label: '1' },
    { count: 5, label: '5' },
    { count: 10, label: '10' },
    { count: 25, label: '25' }
  ];
  
  // Set default selection to 1 player on component mount
  useEffect(() => {
    if (selectedCount === null) {
      onSelectQuickAdd(1);
    }
  }, []);
  
  // Default to 1 player if no count is selected
  const selectedOption = quickAddOptions.find(opt => opt.count === (selectedCount || 1));
  const selectedOptionLabel = `Add ${selectedOption?.label || '1'} Player${(selectedCount || 1) > 1 ? 's' : ''}`;
  
  const handleButtonClick = () => {
    // When the button is clicked directly, add the currently selected count (or default to 1)
    onSelectQuickAdd(selectedCount || 1);
  };
  
  return (
    <div>
      <p className="text-sm font-medium mb-2">Quick Add Players</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="border-neutral-200 w-full"
            onClick={handleButtonClick}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            {selectedOptionLabel}
            <ChevronDown className="h-3.5 w-3.5 ml-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-white">
          {quickAddOptions.map(option => (
            <DropdownMenuItem
              key={option.count}
              onClick={() => onSelectQuickAdd(option.count)}
              className="cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add {option.label} Player{option.count > 1 ? 's' : ''}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default QuickAddButtons;
