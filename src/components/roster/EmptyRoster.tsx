
import React from 'react';

interface EmptyRosterProps {
  totalColumns: number;
  isMobile: boolean;
}

const EmptyRoster: React.FC<EmptyRosterProps> = ({ totalColumns, isMobile }) => {
  if (isMobile) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-md">
        <p className="text-gray-500 mb-4">No players added yet.</p>
      </div>
    );
  }
  
  return (
    <tr>
      <td colSpan={totalColumns} className="text-center p-6 text-gray-500">
        No players added yet. Use the buttons above to add players.
      </td>
    </tr>
  );
};

export default EmptyRoster;
