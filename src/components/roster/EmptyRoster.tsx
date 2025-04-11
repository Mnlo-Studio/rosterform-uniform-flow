
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyRosterProps {
  totalColumns: number;
  isMobile: boolean;
  onAddPlayers: (count: number) => void;
}

const EmptyRoster: React.FC<EmptyRosterProps> = ({ totalColumns, isMobile, onAddPlayers }) => {
  if (isMobile) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-md">
        <p className="text-gray-500 mb-4">No players added yet.</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onAddPlayers(1)}
          >
            <Plus size={16} className="mr-1" /> 1
          </Button>
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
        </div>
      </div>
    );
  }
  
  return (
    <tr className="empty-roster-row">
      <td colSpan={totalColumns} className="text-center p-6">
        <p className="text-gray-500 mb-4">No players added yet.</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onAddPlayers(1)}
          >
            <Plus size={16} className="mr-1" /> 1
          </Button>
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
        </div>
      </td>
    </tr>
  );
};

export default EmptyRoster;
