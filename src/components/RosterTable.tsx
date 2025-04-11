
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { Player } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import RosterHeader from './roster/RosterHeader';
import MobilePlayerList from './roster/MobilePlayerList';
import DesktopPlayerList from './roster/DesktopPlayerList';
import EmptyRoster from './roster/EmptyRoster';

const RosterTable: React.FC = () => {
  const { players, bulkOptions, addPlayers, removePlayer, updatePlayer } = useRoster();
  const isMobile = useIsMobile();

  const handleInputChange = (id: string, field: keyof Player, value: string) => {
    updatePlayer(id, { [field]: value });
  };

  const handleSelectChange = (id: string, field: keyof Player, value: string) => {
    updatePlayer(id, { [field]: value });
  };

  // Calculate the additional columns
  const additionalColumnsCount = 
    (bulkOptions.showShortsSize ? 1 : 0) + 
    (bulkOptions.showSockSize ? 1 : 0) + 
    (bulkOptions.showInitials ? 1 : 0);

  // Calculate total columns (base columns + additional columns)
  const totalColumns = 5 + additionalColumnsCount; // #, Name, Number, Size, Gender + additional + Action

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-8">
      <RosterHeader onAddPlayers={addPlayers} />
      
      {isMobile ? (
        <MobilePlayerList 
          players={players}
          showShortsSize={bulkOptions.showShortsSize}
          showSockSize={bulkOptions.showSockSize}
          showInitials={bulkOptions.showInitials}
          onRemove={removePlayer}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
        />
      ) : (
        <DesktopPlayerList 
          players={players}
          showShortsSize={bulkOptions.showShortsSize}
          showSockSize={bulkOptions.showSockSize}
          showInitials={bulkOptions.showInitials}
          totalColumns={totalColumns}
          onRemove={removePlayer}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
        />
      )}
      
      {players.length === 0 && (
        <EmptyRoster 
          totalColumns={totalColumns} 
          isMobile={isMobile} 
        />
      )}
    </div>
  );
};

export default RosterTable;
