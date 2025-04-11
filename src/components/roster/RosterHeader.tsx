
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface RosterHeaderProps {
  onAddPlayers: (count: number) => void;
}

const RosterHeader: React.FC<RosterHeaderProps> = ({ onAddPlayers }) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">Roster Table</h2>
      
      <div className="flex space-x-2 mt-2 sm:mt-0">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onAddPlayers(5)}
        >
          <Plus size={16} className="mr-1" /> 5
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onAddPlayers(10)}
        >
          <Plus size={16} className="mr-1" /> 10
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onAddPlayers(25)}
        >
          <Plus size={16} className="mr-1" /> 25
        </Button>
      </div>
    </div>
  );
};

export default RosterHeader;
