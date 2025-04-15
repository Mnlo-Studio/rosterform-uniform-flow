import React from 'react';
import { Player, Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import ProductSelect from './ProductSelect';

interface PlayerCardProps {
  player: Player;
  index: number;
  showName: boolean;
  showNumber: boolean;
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
  products: Product[];
  onRemove: (id: string) => void;
  onInputChange: (id: string, field: keyof Player, value: string) => void;
  onSelectChange: (id: string, field: keyof Player, value: string) => void;
  onProductChange: (productId: string | undefined) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  index,
  showName,
  showNumber,
  showShortsSize,
  showSockSize,
  showInitials,
  products,
  onRemove,
  onInputChange,
  onSelectChange,
  onProductChange
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Player {index + 1}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-red-500"
            onClick={() => onRemove(player.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {showName && (
            <div>
              <label htmlFor={`name-${player.id}`} className="text-xs font-medium text-gray-700 mb-1 block">
                Name
              </label>
              <Input
                id={`name-${player.id}`}
                value={player.name}
                onChange={(e) => onInputChange(player.id, 'name', e.target.value)}
                placeholder="Player name"
                className="h-9"
              />
            </div>
          )}
          
          {showNumber && (
            <div>
              <label htmlFor={`number-${player.id}`} className="text-xs font-medium text-gray-700 mb-1 block">
                Number
              </label>
              <Input
                id={`number-${player.id}`}
                value={player.number}
                onChange={(e) => onInputChange(player.id, 'number', e.target.value)}
                placeholder="#"
                className="h-9"
              />
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`size-${player.id}`} className="text-xs font-medium text-gray-700 mb-1 block">
                Size
              </label>
              <Select
                value={player.size}
                onValueChange={(value) => onSelectChange(player.id, 'size', value)}
              >
                <SelectTrigger id={`size-${player.id}`} className="h-9">
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
              <label htmlFor={`gender-${player.id}`} className="text-xs font-medium text-gray-700 mb-1 block">
                Gender
              </label>
              <Select
                value={player.gender}
                onValueChange={(value) => onSelectChange(player.id, 'gender', value)}
              >
                <SelectTrigger id={`gender-${player.id}`} className="h-9">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label htmlFor={`product-${player.id}`} className="text-xs font-medium text-gray-700 mb-1 block">
              Product
            </label>
            <ProductSelect
              id={`product-${player.id}`}
              productId={player.productId}
              products={products}
              onValueChange={onProductChange}
              triggerClassName="h-9"
            />
          </div>
          
          {showShortsSize && (
            <div>
              <label htmlFor={`shorts-${player.id}`} className="text-xs font-medium text-gray-700 mb-1 block">
                Shorts Size
              </label>
              <Select
                value={player.shortsSize || ''}
                onValueChange={(value) => onSelectChange(player.id, 'shortsSize', value)}
              >
                <SelectTrigger id={`shorts-${player.id}`} className="h-9">
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
              <label htmlFor={`socks-${player.id}`} className="text-xs font-medium text-gray-700 mb-1 block">
                Sock Size
              </label>
              <Select
                value={player.sockSize || ''}
                onValueChange={(value) => onSelectChange(player.id, 'sockSize', value)}
              >
                <SelectTrigger id={`socks-${player.id}`} className="h-9">
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
              <label htmlFor={`initials-${player.id}`} className="text-xs font-medium text-gray-700 mb-1 block">
                Initials
              </label>
              <Input
                id={`initials-${player.id}`}
                value={player.initials || ''}
                onChange={(e) => onInputChange(player.id, 'initials', e.target.value)}
                placeholder="ABC"
                maxLength={3}
                className="h-9"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
