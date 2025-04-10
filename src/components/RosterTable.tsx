
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

const RosterTable: React.FC = () => {
  const { players, bulkOptions, addPlayers, removePlayer, updatePlayer } = useRoster();

  const handleInputChange = (id: string, field: keyof Player, value: string) => {
    updatePlayer(id, { [field]: value });
  };

  const handleSelectChange = (id: string, field: keyof Player, value: string) => {
    updatePlayer(id, { [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-20">
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
      
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="w-full min-w-[640px]">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-3 text-sm font-medium text-gray-700 w-[40px]">#</th>
                <th className="p-3 text-sm font-medium text-gray-700">Name*</th>
                <th className="p-3 text-sm font-medium text-gray-700 w-[80px]">Number*</th>
                <th className="p-3 text-sm font-medium text-gray-700 w-[100px]">Size*</th>
                <th className="p-3 text-sm font-medium text-gray-700 w-[100px]">Gender*</th>
                
                {bulkOptions.showShortsSize && (
                  <th className="p-3 text-sm font-medium text-gray-700 w-[100px]">Shorts</th>
                )}
                
                {bulkOptions.showSockSize && (
                  <th className="p-3 text-sm font-medium text-gray-700 w-[100px]">Socks</th>
                )}
                
                {bulkOptions.showInitials && (
                  <th className="p-3 text-sm font-medium text-gray-700 w-[100px]">Initials</th>
                )}
                
                <th className="p-3 text-sm font-medium text-gray-700 w-[60px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {players.length > 0 ? (
                players.map((player, index) => (
                  <tr key={player.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-500">{index + 1}</td>
                    <td className="p-3">
                      <Input
                        value={player.name}
                        onChange={(e) => handleInputChange(player.id, 'name', e.target.value)}
                        placeholder="Player name"
                        className="h-8"
                      />
                    </td>
                    <td className="p-3">
                      <Input
                        value={player.number}
                        onChange={(e) => handleInputChange(player.id, 'number', e.target.value)}
                        placeholder="#"
                        className="h-8"
                      />
                    </td>
                    <td className="p-3">
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
                    </td>
                    <td className="p-3">
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
                    </td>
                    
                    {bulkOptions.showShortsSize && (
                      <td className="p-3">
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
                      </td>
                    )}
                    
                    {bulkOptions.showSockSize && (
                      <td className="p-3">
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
                      </td>
                    )}
                    
                    {bulkOptions.showInitials && (
                      <td className="p-3">
                        <Input
                          value={player.initials || ''}
                          onChange={(e) => handleInputChange(player.id, 'initials', e.target.value)}
                          placeholder="ABC"
                          maxLength={3}
                          className="h-8"
                        />
                      </td>
                    )}
                    
                    <td className="p-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePlayer(player.id)}
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan={7 + (bulkOptions.showShortsSize ? 1 : 0) + (bulkOptions.showSockSize ? 1 : 0) + (bulkOptions.showInitials ? 1 : 0)} 
                    className="p-6 text-center text-gray-500"
                  >
                    No players added yet. Use the buttons above to add players.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ScrollArea>
      
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
