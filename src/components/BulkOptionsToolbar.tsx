
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const BulkOptionsToolbar: React.FC = () => {
  const { bulkOptions, updateBulkOptions } = useRoster();

  const handleGenderChange = (value: string) => {
    updateBulkOptions({ defaultGender: value });
  };

  const handleSizeChange = (value: string) => {
    updateBulkOptions({ defaultSize: value });
  };

  const handleNumberFillChange = (value: 'manual' | 'odd' | 'even' | 'random') => {
    updateBulkOptions({ numberFillType: value });
  };

  const toggleOption = (option: keyof Pick<typeof bulkOptions, 'showShortsSize' | 'showSockSize' | 'showInitials'>) => {
    updateBulkOptions({ [option]: !bulkOptions[option] });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <h3 className="text-md font-medium mb-3 text-gray-700">Bulk Options</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="defaultGender" className="text-sm">Default Gender</Label>
          <Select value={bulkOptions.defaultGender} onValueChange={handleGenderChange}>
            <SelectTrigger id="defaultGender" className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="defaultSize" className="text-sm">Default Size</Label>
          <Select value={bulkOptions.defaultSize} onValueChange={handleSizeChange}>
            <SelectTrigger id="defaultSize" className="w-full">
              <SelectValue placeholder="Select size" />
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
          <Label htmlFor="numberFill" className="text-sm">Number Auto-Fill</Label>
          <Select 
            value={bulkOptions.numberFillType} 
            onValueChange={(value) => handleNumberFillChange(value as any)}
          >
            <SelectTrigger id="numberFill" className="w-full">
              <SelectValue placeholder="Select number pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="odd">Odd (1,3,5...)</SelectItem>
              <SelectItem value="even">Even (2,4,6...)</SelectItem>
              <SelectItem value="random">Random</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-0 sm:flex sm:space-x-8">
        <div className="flex items-center space-x-2">
          <Switch 
            id="showShortsSize" 
            checked={bulkOptions.showShortsSize}
            onCheckedChange={() => toggleOption('showShortsSize')}
          />
          <Label htmlFor="showShortsSize" className="text-sm">Shorts Size</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="showSockSize" 
            checked={bulkOptions.showSockSize}
            onCheckedChange={() => toggleOption('showSockSize')}
          />
          <Label htmlFor="showSockSize" className="text-sm">Sock Size</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="showInitials" 
            checked={bulkOptions.showInitials}
            onCheckedChange={() => toggleOption('showInitials')}
          />
          <Label htmlFor="showInitials" className="text-sm">Initials</Label>
        </div>
      </div>
    </div>
  );
};

export default BulkOptionsToolbar;
