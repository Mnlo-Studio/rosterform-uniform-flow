
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { BulkOptions } from '@/types';

// Individual select components for modular usage
const GenderSelect: React.FC<{ value: string; onChange: (value: string) => void }> = ({ 
  value, 
  onChange 
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger id="defaultGender" className="w-full">
      <SelectValue placeholder="Select gender" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Male">Male</SelectItem>
      <SelectItem value="Female">Female</SelectItem>
      <SelectItem value="Kids">Kids</SelectItem>
      <SelectItem value="Other">Other</SelectItem>
    </SelectContent>
  </Select>
);

const SizeSelect: React.FC<{ value: string; onChange: (value: string) => void }> = ({ 
  value, 
  onChange 
}) => (
  <Select value={value} onValueChange={onChange}>
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
);

const NamePrefixSelect: React.FC<{ 
  value: 'none' | 'player' | 'custom'; 
  onChange: (value: 'none' | 'player' | 'custom') => void 
}> = ({ value, onChange }) => (
  <Select 
    value={value} 
    onValueChange={(val) => onChange(val as 'none' | 'player' | 'custom')}
  >
    <SelectTrigger id="namePrefixType" className="w-full">
      <SelectValue placeholder="Select name pattern" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="custom">Custom</SelectItem>
      <SelectItem value="player">Player #</SelectItem>
      <SelectItem value="none">None</SelectItem>
    </SelectContent>
  </Select>
);

const NumberFillSelect: React.FC<{ 
  value: 'custom' | 'odd' | 'even' | 'random'; 
  onChange: (value: 'custom' | 'odd' | 'even' | 'random') => void 
}> = ({ value, onChange }) => (
  <Select 
    value={value} 
    onValueChange={(val) => onChange(val as 'custom' | 'odd' | 'even' | 'random')}
  >
    <SelectTrigger id="numberFill" className="w-full">
      <SelectValue placeholder="Select number pattern" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="custom">Custom</SelectItem>
      <SelectItem value="odd">Odd (1,3,5...)</SelectItem>
      <SelectItem value="even">Even (2,4,6...)</SelectItem>
      <SelectItem value="random">Random</SelectItem>
    </SelectContent>
  </Select>
);

const NameCaseSelect: React.FC<{ 
  value: 'normal' | 'uppercase' | 'lowercase'; 
  onChange: (value: 'normal' | 'uppercase' | 'lowercase') => void 
}> = ({ value, onChange }) => (
  <Select 
    value={value} 
    onValueChange={(val) => onChange(val as 'normal' | 'uppercase' | 'lowercase')}
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
);

interface DefaultOptionsSectionProps {
  bulkOptions: BulkOptions;
  onGenderChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onNumberFillChange: (value: 'custom' | 'odd' | 'even' | 'random') => void;
  onNamePrefixTypeChange: (value: 'none' | 'player' | 'custom') => void;
  onNameCaseChange: (value: 'normal' | 'uppercase' | 'lowercase') => void;
}

const DefaultOptionsSection: React.FC<DefaultOptionsSectionProps> & {
  GenderSelect: typeof GenderSelect;
  SizeSelect: typeof SizeSelect;
  NamePrefixSelect: typeof NamePrefixSelect;
  NumberFillSelect: typeof NumberFillSelect;
  NameCaseSelect: typeof NameCaseSelect;
} = ({
  bulkOptions,
  onGenderChange,
  onSizeChange,
  onNumberFillChange,
  onNamePrefixTypeChange,
  onNameCaseChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Gender */}
      <div>
        <label htmlFor="defaultGender" className="text-sm font-medium mb-2 block">Default Gender</label>
        <GenderSelect value={bulkOptions.defaultGender} onChange={onGenderChange} />
      </div>
      
      {/* Size */}
      <div>
        <label htmlFor="defaultSize" className="text-sm font-medium mb-2 block">Default Size</label>
        <SizeSelect value={bulkOptions.defaultSize} onChange={onSizeChange} />
      </div>
      
      {/* Name Auto-Fill */}
      <div>
        <label htmlFor="namePrefixType" className="text-sm font-medium mb-2 block">Name Auto-Fill</label>
        <NamePrefixSelect value={bulkOptions.namePrefixType} onChange={onNamePrefixTypeChange} />
      </div>
      
      {/* Number Auto-Fill */}
      <div>
        <label htmlFor="numberFill" className="text-sm font-medium mb-2 block">Number Auto-Fill</label>
        <NumberFillSelect value={bulkOptions.numberFillType} onChange={onNumberFillChange} />
      </div>
      
      {/* Name Case */}
      <div>
        <label htmlFor="nameCaseType" className="text-sm font-medium mb-2 block">Name Case</label>
        <NameCaseSelect value={bulkOptions.nameCaseType} onChange={onNameCaseChange} />
      </div>
    </div>
  );
};

// Add the component types to the DefaultOptionsSection object
DefaultOptionsSection.GenderSelect = GenderSelect;
DefaultOptionsSection.SizeSelect = SizeSelect;
DefaultOptionsSection.NamePrefixSelect = NamePrefixSelect;
DefaultOptionsSection.NumberFillSelect = NumberFillSelect;
DefaultOptionsSection.NameCaseSelect = NameCaseSelect;

export default DefaultOptionsSection;
