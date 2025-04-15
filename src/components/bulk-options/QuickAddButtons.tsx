
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRoster } from '@/context/RosterContext';

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
      <div className="flex flex-wrap gap-2">
        {quickAddOptions.map(option => (
          <Button
            key={option.count}
            variant="outline"
            size="sm"
            onClick={() => addPlayers(option.count)}
            className="border-neutral-200"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickAddButtons;
