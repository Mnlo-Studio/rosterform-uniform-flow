
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface EmptyRosterProps {
  totalColumns: number;
  isMobile: boolean;
  onAddPlayers: (count: number) => void;
}

const EmptyRoster: React.FC<EmptyRosterProps> = ({ totalColumns, isMobile, onAddPlayers }) => {
  return (
    <>
      {isMobile ? (
        <div className="py-8 text-center text-gray-500">
          No players added yet. Use the buttons above to add players.
        </div>
      ) : (
        <TableRow>
          <TableCell 
            colSpan={totalColumns} 
            className="text-center p-6 text-gray-500"
          >
            No players added yet. Use the buttons above to add players.
          </TableCell>
        </TableRow>
      )}
      
      <div className="mt-4 mb-4 flex justify-end">
        <Button 
          onClick={() => onAddPlayers(5)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={16} className="mr-2" />
          Add Initial Players
        </Button>
      </div>
    </>
  );
};

export default EmptyRoster;
