
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CustomNamePrefixInputProps {
  prefix: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomNamePrefixInput: React.FC<CustomNamePrefixInputProps> = ({ prefix, onChange }) => {
  return (
    <div>
      <Label htmlFor="namePrefix" className="text-sm font-medium">Custom Name Prefix</Label>
      <Input 
        id="namePrefix" 
        value={prefix} 
        onChange={onChange} 
        placeholder="Enter prefix (e.g. 'Team Member')"
        className="w-full mt-1"
      />
    </div>
  );
};

export default CustomNamePrefixInput;
