
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { Player } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  // Base depends on whether name and number are shown
  const baseColumnsCount = 3 + // # (index), size, gender
    (bulkOptions.showName ? 1 : 0) +
    (bulkOptions.showNumber ? 1 : 0);
  
  const totalColumns = baseColumnsCount + additionalColumnsCount + 1; // +1 for action column

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Team Roster</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <RosterHeader onAddPlayers={addPlayers} />
        
        {isMobile ? (
          <MobilePlayerList 
            players={players}
            showName={bulkOptions.showName}
            showNumber={bulkOptions.showNumber}
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
            showName={bulkOptions.showName}
            showNumber={bulkOptions.showNumber}
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
            onAddPlayers={addPlayers}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RosterTable;
