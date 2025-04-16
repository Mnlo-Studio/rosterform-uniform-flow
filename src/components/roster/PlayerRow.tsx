
import React from 'react';
import { Player } from '@/types';
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import PlayerInputCell from './row/PlayerInputCell';
import PlayerSelectCell from './row/PlayerSelectCell';
import ActionCell from './row/ActionCell';
import ProductCell from './row/ProductCell';

interface PlayerRowProps {
  player: Player;
  index: number;
  showName: boolean;
  showNumber: boolean;
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
  onRemove: (id: string) => void;
  onInputChange: (id: string, field: keyof Player, value: string) => void;
  onSelectChange: (id: string, field: keyof Player, value: string) => void;
}

const PlayerRow: React.FC<PlayerRowProps> = ({
  player,
  index,
  showName,
  showNumber,
  showShortsSize,
  showSockSize,
  showInitials,
  onRemove,
  onInputChange,
  onSelectChange
}) => {
  const sizeOptions = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "2XL", label: "2XL" },
    { value: "3XL", label: "3XL" }
  ];
  
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" }
  ];

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      
      <TableCell>
        <ProductCell playerId={player.id} />
      </TableCell>
      
      {showName && (
        <TableCell>
          <PlayerInputCell
            value={player.name}
            onChange={(value) => onInputChange(player.id, 'name', value)}
            placeholder="Player name"
            field="name"
          />
        </TableCell>
      )}
      
      {showNumber && (
        <TableCell>
          <PlayerInputCell
            value={player.number}
            onChange={(value) => onInputChange(player.id, 'number', value)}
            placeholder="#"
            field="number"
          />
        </TableCell>
      )}
      
      <TableCell>
        <PlayerSelectCell
          value={player.size}
          onChange={(value) => onSelectChange(player.id, 'size', value)}
          placeholder="Size"
          options={sizeOptions}
        />
      </TableCell>
      
      <TableCell>
        <PlayerSelectCell
          value={player.gender}
          onChange={(value) => onSelectChange(player.id, 'gender', value)}
          placeholder="Gender"
          options={genderOptions}
        />
      </TableCell>
      
      {showShortsSize && (
        <TableCell>
          <PlayerSelectCell
            value={player.shortsSize || ''}
            onChange={(value) => onSelectChange(player.id, 'shortsSize', value)}
            placeholder="Size"
            options={sizeOptions}
          />
        </TableCell>
      )}
      
      {showSockSize && (
        <TableCell>
          <PlayerSelectCell
            value={player.sockSize || ''}
            onChange={(value) => onSelectChange(player.id, 'sockSize', value)}
            placeholder="Size"
            options={sizeOptions.slice(0, 5)} // Only XS to XL for socks
          />
        </TableCell>
      )}
      
      {showInitials && (
        <TableCell>
          <PlayerInputCell
            value={player.initials || ''}
            onChange={(value) => onInputChange(player.id, 'initials', value)}
            placeholder="ABC"
            field="initials"
            maxLength={3}
          />
        </TableCell>
      )}
      
      <TableCell>
        <ActionCell onRemove={() => onRemove(player.id)} />
      </TableCell>
    </TableRow>
  );
};

export default PlayerRow;
