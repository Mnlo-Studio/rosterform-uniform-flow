
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

interface PlayerCardProps {
  player: Player;
  index: number;
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
  onRemove: (id: string) => void;
  onInputChange: (id: string, field: keyof Player, value: string) => void;
  onSelectChange: (id: string, field: keyof Player, value: string) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  index,
  showShortsSize,
  showSockSize,
  showInitials,
  onRemove,
  onInputChange,
  onSelectChange
}) => {
  return (
    <div className="border rounded-md p-3 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-700">Player #{index + 1}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(player.id)}
          className="h-8 w-8 text-gray-500 hover:text-red-500"
        >
          <Trash2 size={16} />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Name*</label>
          <Input
            value={player.name}
            onChange={(e) => onInputChange(player.id, 'name', e.target.value)}
            placeholder="Player name"
            className="h-8"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">Number*</label>
          <Input
            value={player.number}
            onChange={(e) => onInputChange(player.id, 'number', e.target.value)}
            placeholder="#"
            className="h-8"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">Size*</label>
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
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">Gender*</label>
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
        </div>
        
        {showShortsSize && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">Shorts Size</label>
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
          </div>
        )}
        
        {showSockSize && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">Sock Size</label>
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
          </div>
        )}
        
        {showInitials && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">Initials</label>
            <Input
              value={player.initials || ''}
              onChange={(e) => onInputChange(player.id, 'initials', e.target.value)}
              placeholder="ABC"
              maxLength={3}
              className="h-8"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
