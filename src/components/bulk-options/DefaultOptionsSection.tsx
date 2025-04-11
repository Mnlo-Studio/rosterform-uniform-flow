
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BulkOptions } from '@/types';

interface DefaultOptionsSectionProps {
  bulkOptions: BulkOptions;
  onGenderChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onNumberFillChange: (value: 'manual' | 'odd' | 'even' | 'random') => void;
  onNamePrefixTypeChange: (value: 'none' | 'player' | 'custom') => void;
  onNameCaseChange: (value: 'normal' | 'uppercase' | 'lowercase') => void;
}

const DefaultOptionsSection: React.FC<DefaultOptionsSectionProps> = ({
  bulkOptions,
  onGenderChange,
  onSizeChange,
  onNumberFillChange,
  onNamePrefixTypeChange,
  onNameCaseChange
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div>
        <Label htmlFor="defaultGender" className="text-sm">Default Gender</Label>
        <Select value={bulkOptions.defaultGender} onValueChange={onGenderChange}>
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
        <Select value={bulkOptions.defaultSize} onValueChange={onSizeChange}>
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
          onValueChange={(value) => onNumberFillChange(value as any)}
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
          onValueChange={(value) => onNamePrefixTypeChange(value as any)}
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
          onValueChange={(value) => onNameCaseChange(value as any)}
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
  );
};

export default DefaultOptionsSection;
