
import React from 'react';

interface EmptyRosterProps {
  totalColumns: number;
  isMobile: boolean;
  onAddPlayers: (count: number) => void;
}

const EmptyRoster: React.FC<EmptyRosterProps> = ({ totalColumns, isMobile }) => {
  if (isMobile) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-md">
        <p className="text-gray-500">No players added yet.</p>
      </div>
    );
  }
  
  return (
    <tr className="empty-roster-row">
      <td colSpan={totalColumns} className="text-center p-6">
        <p className="text-gray-500">No players added yet.</p>
      </td>
    </tr>
  );
};

export default EmptyRoster;
