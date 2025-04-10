
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-20">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Roster Table</h2>
        
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => addPlayers(5)}
          >
            <Plus size={16} className="mr-1" /> 5
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => addPlayers(10)}
          >
            <Plus size={16} className="mr-1" /> 10
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => addPlayers(25)}
          >
            <Plus size={16} className="mr-1" /> 25
          </Button>
        </div>
      </div>
      
      {isMobile ? (
        // Mobile view - cards
        <div className="space-y-4">
          {players.length > 0 ? (
            players.map((player, index) => (
              <div key={player.id} className="border rounded-md p-3 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">Player #{index + 1}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePlayer(player.id)}
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
                      onChange={(e) => handleInputChange(player.id, 'name', e.target.value)}
                      placeholder="Player name"
                      className="h-8"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Number*</label>
                    <Input
                      value={player.number}
                      onChange={(e) => handleInputChange(player.id, 'number', e.target.value)}
                      placeholder="#"
                      className="h-8"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Size*</label>
                    <Select
                      value={player.size}
                      onValueChange={(value) => handleSelectChange(player.id, 'size', value)}
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
                      onValueChange={(value) => handleSelectChange(player.id, 'gender', value)}
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
                  
                  {bulkOptions.showShortsSize && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Shorts Size</label>
                      <Select
                        value={player.shortsSize || ''}
                        onValueChange={(value) => handleSelectChange(player.id, 'shortsSize', value)}
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
                  
                  {bulkOptions.showSockSize && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Sock Size</label>
                      <Select
                        value={player.sockSize || ''}
                        onValueChange={(value) => handleSelectChange(player.id, 'sockSize', value)}
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
                  
                  {bulkOptions.showInitials && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Initials</label>
                      <Input
                        value={player.initials || ''}
                        onChange={(e) => handleInputChange(player.id, 'initials', e.target.value)}
                        placeholder="ABC"
                        maxLength={3}
                        className="h-8"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              No players added yet. Use the buttons above to add players.
            </div>
          )}
        </div>
      ) : (
        // Desktop view - table
        <ScrollArea className="h-[400px] rounded-md border">
          <div className="w-full min-w-[640px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">#</TableHead>
                  <TableHead>Name*</TableHead>
                  <TableHead className="w-[80px]">Number*</TableHead>
                  <TableHead className="w-[100px]">Size*</TableHead>
                  <TableHead className="w-[100px]">Gender*</TableHead>
                  
                  {bulkOptions.showShortsSize && (
                    <TableHead className="w-[100px]">Shorts</TableHead>
                  )}
                  
                  {bulkOptions.showSockSize && (
                    <TableHead className="w-[100px]">Socks</TableHead>
                  )}
                  
                  {bulkOptions.showInitials && (
                    <TableHead className="w-[100px]">Initials</TableHead>
                  )}
                  
                  <TableHead className="w-[60px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.length > 0 ? (
                  players.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Input
                          value={player.name}
                          onChange={(e) => handleInputChange(player.id, 'name', e.target.value)}
                          placeholder="Player name"
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={player.number}
                          onChange={(e) => handleInputChange(player.id, 'number', e.target.value)}
                          placeholder="#"
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={player.size}
                          onValueChange={(value) => handleSelectChange(player.id, 'size', value)}
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
                          onValueChange={(value) => handleSelectChange(player.id, 'gender', value)}
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
                      
                      {bulkOptions.showShortsSize && (
                        <TableCell>
                          <Select
                            value={player.shortsSize || ''}
                            onValueChange={(value) => handleSelectChange(player.id, 'shortsSize', value)}
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
                      
                      {bulkOptions.showSockSize && (
                        <TableCell>
                          <Select
                            value={player.sockSize || ''}
                            onValueChange={(value) => handleSelectChange(player.id, 'sockSize', value)}
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
                      
                      {bulkOptions.showInitials && (
                        <TableCell>
                          <Input
                            value={player.initials || ''}
                            onChange={(e) => handleInputChange(player.id, 'initials', e.target.value)}
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
                          onClick={() => removePlayer(player.id)}
                          className="h-8 w-8 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={totalColumns} 
                      className="text-center p-6 text-gray-500"
                    >
                      No players added yet. Use the buttons above to add players.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      )}
      
      {players.length === 0 && (
        <div className="mt-4 flex justify-center">
          <Button onClick={() => addPlayers(5)}>
            <Plus size={16} className="mr-2" />
            Add Initial Players
          </Button>
        </div>
      )}
    </div>
  );
};

export default RosterTable;
