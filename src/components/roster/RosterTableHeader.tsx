
import React from 'react';
import { TableHead, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useRoster } from '@/context/RosterContext';

interface RosterTableHeaderProps {
  showName: boolean;
  showNumber: boolean;
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
}

const RosterTableHeader: React.FC<RosterTableHeaderProps> = ({
  showName,
  showNumber,
  showShortsSize,
  showSockSize,
  showInitials,
}) => {
  const { players, selectedPlayers, selectAllPlayers, deselectAllPlayers } = useRoster();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAllPlayers();
    } else {
      deselectAllPlayers();
    }
  };

  const allSelected = players.length > 0 && selectedPlayers.length === players.length;

  return (
    <TableRow>
      <TableHead className="w-[40px] pl-4">
        <Checkbox 
          checked={allSelected} 
          onCheckedChange={handleSelectAll} 
          aria-label="Select all players" 
        />
      </TableHead>
      <TableHead className="w-[50px]">#</TableHead>
      <TableHead>Product</TableHead>
      {showName && <TableHead>Name</TableHead>}
      {showNumber && <TableHead>Number</TableHead>}
      <TableHead>Size</TableHead>
      <TableHead>Gender</TableHead>
      {showShortsSize && <TableHead>Shorts Size</TableHead>}
      {showSockSize && <TableHead>Sock Size</TableHead>}
      {showInitials && <TableHead>Initials</TableHead>}
      <TableHead className="w-[50px]">Action</TableHead>
    </TableRow>
  );
};

export default RosterTableHeader;
