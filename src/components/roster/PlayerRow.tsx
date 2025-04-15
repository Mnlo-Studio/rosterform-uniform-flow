import React from 'react';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useRoster } from '@/context/RosterContext';
import ProductSelect from './ProductSelect';

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
  const { productInfo, assignProductToPlayer } = useRoster();
  
  const handleProductChange = (productId: string | undefined) => {
    assignProductToPlayer(player.id, productId);
  };

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      
      <TableCell>
        <ProductSelect
          productId={player.productId}
          products={productInfo.products}
          onValueChange={handleProductChange}
          triggerClassName="h-8"
        />
      </TableCell>
      
      {showName && (
        <TableCell>
          <Input
            value={player.name}
            onChange={(e) => onInputChange(player.id, 'name', e.target.value)}
            placeholder="Player name"
            className="h-8"
          />
        </TableCell>
      )}
      
      {showNumber && (
        <TableCell>
          <Input
            value={player.number}
            onChange={(e) => onInputChange(player.id, 'number', e.target.value)}
            placeholder="#"
            className="h-8"
          />
        </TableCell>
      )}
      
      <TableCell>
        <Select
          value={player.size}
          onValueChange={(value) => onSelectChange(player.id, 'size', value)}
        >
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="XS">XS</SelectItem>
            <SelectItem value="S">S</SelectItem>
            <SelectItem value="M">M</SelectItem>
            <SelectItem value="L">L</SelectItem>
            <SelectItem value="XL">XL</SelectItem>
            <SelectItem value="2XL">2XL</SelectItem>
            <SelectItem value="3XL">3XL</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      
      <TableCell>
        <Select
          value={player.gender}
          onValueChange={(value) => onSelectChange(player.id, 'gender', value)}
        >
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      
      {showShortsSize && (
        <TableCell>
          <Select
            value={player.shortsSize || ''}
            onValueChange={(value) => onSelectChange(player.id, 'shortsSize', value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="XS">XS</SelectItem>
              <SelectItem value="S">S</SelectItem>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="L">L</SelectItem>
              <SelectItem value="XL">XL</SelectItem>
              <SelectItem value="2XL">2XL</SelectItem>
              <SelectItem value="3XL">3XL</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
      )}
      
      {showSockSize && (
        <TableCell>
          <Select
            value={player.sockSize || ''}
            onValueChange={(value) => onSelectChange(player.id, 'sockSize', value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="XS">XS</SelectItem>
              <SelectItem value="S">S</SelectItem>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="L">L</SelectItem>
              <SelectItem value="XL">XL</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
      )}
      
      {showInitials && (
        <TableCell>
          <Input
            value={player.initials || ''}
            onChange={(e) => onInputChange(player.id, 'initials', e.target.value)}
            placeholder="ABC"
            maxLength={3}
            className="h-8"
          />
        </TableCell>
      )}
      
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(player.id)}
          className="h-8 w-8 text-gray-500 hover:text-red-500"
        >
          <Trash2 size={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PlayerRow;
