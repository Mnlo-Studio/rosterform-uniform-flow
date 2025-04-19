
import React, { useEffect } from 'react';
import { useRoster } from '@/context/RosterContext';
import { Player } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import MobilePlayerList from './roster/MobilePlayerList';
import DesktopPlayerList from './roster/DesktopPlayerList';
import EmptyRoster from './roster/EmptyRoster';

const RosterTable: React.FC = () => {
  const { 
    players, 
    bulkOptions, 
    removePlayer, 
    updatePlayer,
    productInfo,
    areAllPlayersAssignedProducts,
    addPlayers
  } = useRoster();
  
  const isMobile = useIsMobile();

  const handleInputChange = (id: string, field: keyof Player, value: string) => {
    updatePlayer(id, { [field]: value });
  };

  const handleSelectChange = (id: string, field: keyof Player, value: string) => {
    updatePlayer(id, { [field]: value });
  };

  const handleAddPlayers = (count: number) => {
    addPlayers(count);
  };

  // Calculate the additional columns
  const additionalColumnsCount = 
    (bulkOptions.showShortsSize ? 1 : 0) + 
    (bulkOptions.showSockSize ? 1 : 0) + 
    (bulkOptions.showInitials ? 1 : 0);

  // Calculate total columns (base columns + additional columns)
  // Base depends on whether name and number are shown
  const baseColumnsCount = 4 + // # (index), size, gender, product
    (bulkOptions.showName ? 1 : 0) +
    (bulkOptions.showNumber ? 1 : 0);
  
  const totalColumns = baseColumnsCount + additionalColumnsCount + 1; // +1 for action column

  // Determine if we need to show warnings
  const showProductWarning = players.length > 0 && productInfo.products.length > 0 && !areAllPlayersAssignedProducts();
  const showNoProductsWarning = players.length > 0 && productInfo.products.length === 0;

  // Debug logging
  useEffect(() => {
    console.log('RosterTable - Current players:', players);
  }, [players]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Team Roster</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {showNoProductsWarning && (
          <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <p className="text-amber-800">No products have been added. Add at least one product to assign to players.</p>
            </div>
          </div>
        )}
        
        {showProductWarning && (
          <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <p className="text-amber-800">Some players do not have a product assigned.</p>
            </div>
          </div>
        )}
        
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
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RosterTable;
