
import React from 'react';
import { Player } from '@/types';
import PlayerRow from './PlayerRow';
import RosterTableHeader from './RosterTableHeader';
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { ScrollArea } from '@/components/ui/scroll-area';

interface DesktopPlayerListProps {
  players: Player[];
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
  totalColumns: number;
  onRemove: (id: string) => void;
  onInputChange: (id: string, field: keyof Player, value: string) => void;
  onSelectChange: (id: string, field: keyof Player, value: string) => void;
}

const DesktopPlayerList: React.FC<DesktopPlayerListProps> = ({
  players,
  showShortsSize,
  showSockSize,
  showInitials,
  totalColumns,
  onRemove,
  onInputChange,
  onSelectChange
}) => {
  return (
    <ScrollArea className="h-[400px] rounded-md border">
      <div className="w-full min-w-[640px]">
        <Table>
          <RosterTableHeader 
            showShortsSize={showShortsSize} 
            showSockSize={showSockSize} 
            showInitials={showInitials} 
          />
          <TableBody>
            {players.length > 0 ? (
              players.map((player, index) => (
                <PlayerRow
                  key={player.id}
                  player={player}
                  index={index}
                  showShortsSize={showShortsSize}
                  showSockSize={showSockSize}
                  showInitials={showInitials}
                  onRemove={onRemove}
                  onInputChange={onInputChange}
                  onSelectChange={onSelectChange}
                />
              ))
            ) : (
              <tr>
                <td colSpan={totalColumns} className="text-center p-6 text-gray-500">
                  No players added yet. Use the buttons above to add players.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};

export default DesktopPlayerList;
