
import React from 'react';

interface EmptyRosterProps {
  totalColumns: number;
  isMobile: boolean;
  onAddPlayers: (count: number) => void;
}

const EmptyRoster: React.FC<EmptyRosterProps> = ({ totalColumns, isMobile, onAddPlayers }) => {
  const handleAddOnePlayer = () => {
    onAddPlayers(1);
  };

  if (isMobile) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-md">
        <p className="text-gray-500 mb-4">No players added yet.</p>
        <button 
          onClick={handleAddOnePlayer}
          className="text-sm px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          + Add Player
        </button>
      </div>
    );
  }
  
  return (
    <tr className="empty-roster-row">
      <td colSpan={totalColumns} className="text-center p-6">
        <p className="text-gray-500 mb-4">No players added yet.</p>
        <button 
          onClick={handleAddOnePlayer}
          className="text-sm px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          + Add Player
        </button>
      </td>
    </tr>
  );
};

export default EmptyRoster;
