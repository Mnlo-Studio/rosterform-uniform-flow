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
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const BulkOptionsToolbar: React.FC = () => {
  const { bulkOptions, updateBulkOptions } = useRoster();
  const isMobile = useIsMobile();

  const handleGenderChange = (value: string) => {
    updateBulkOptions({ defaultGender: value });
  };

  const handleSizeChange = (value: string) => {
    updateBulkOptions({ defaultSize: value });
  };

  const handleNumberFillChange = (value: 'manual' | 'odd' | 'even' | 'random') => {
    updateBulkOptions({ numberFillType: value });
  };

  const handleNamePrefixTypeChange = (value: 'none' | 'player' | 'custom') => {
    updateBulkOptions({ namePrefixType: value });
  };

  const handleNamePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBulkOptions({ namePrefix: e.target.value });
  };

  const handleNameCaseChange = (value: 'normal' | 'uppercase' | 'lowercase') => {
    updateBulkOptions({ nameCaseType: value });
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
        
        <div>
          <Label htmlFor="namePrefixType" className="text-sm">Name Auto-Fill</Label>
          <Select 
            value={bulkOptions.namePrefixType} 
            onValueChange={(value) => handleNamePrefixTypeChange(value as any)}
          >
            <SelectTrigger id="namePrefixType" className="w-full">
              <SelectValue placeholder="Select name pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="player">Player #</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="nameCaseType" className="text-sm">Name Case</Label>
          <Select 
            value={bulkOptions.nameCaseType} 
            onValueChange={(value) => handleNameCaseChange(value as any)}
          >
            <SelectTrigger id="nameCaseType" className="w-full">
              <SelectValue placeholder="Select name case" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="uppercase">UPPERCASE</SelectItem>
              <SelectItem value="lowercase">lowercase</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {bulkOptions.namePrefixType === 'custom' && (
        <div className="mb-4">
          <Label htmlFor="namePrefix" className="text-sm">Custom Name Prefix</Label>
          <Input 
            id="namePrefix" 
            value={bulkOptions.namePrefix} 
            onChange={handleNamePrefixChange} 
            placeholder="Enter prefix (e.g. 'Team Member')"
            className="w-full"
          />
        </div>
      )}
      
      <div className={`${isMobile ? 'space-y-3' : 'flex space-x-8'}`}>
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
