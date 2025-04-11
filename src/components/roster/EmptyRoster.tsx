
import React from 'react';
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface EmptyRosterProps {
  totalColumns: number;
  isMobile: boolean;
}

const EmptyRoster: React.FC<EmptyRosterProps> = ({ totalColumns, isMobile }) => {
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
    </>
  );
};

export default EmptyRoster;
