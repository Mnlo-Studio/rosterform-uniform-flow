
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown } from 'lucide-react';
import { useRoster } from '@/context/RosterContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const QuickAddButtons: React.FC = () => {
  const { addPlayers } = useRoster();
  
  const quickAddOptions = [
    { count: 1, label: '1' },
    { count: 5, label: '5' },
    { count: 10, label: '10' },
    { count: 25, label: '25' }
  ];
  
  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2">Quick Add Players</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-neutral-200 w-full">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Quick Add Players
            <ChevronDown className="h-3.5 w-3.5 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-white">
          {quickAddOptions.map(option => (
            <DropdownMenuItem
              key={option.count}
              onClick={() => addPlayers(option.count)}
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
