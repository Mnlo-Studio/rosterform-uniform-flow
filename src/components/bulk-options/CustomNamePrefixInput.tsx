
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CustomNamePrefixInputProps {
  prefix: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomNamePrefixInput: React.FC<CustomNamePrefixInputProps> = ({ prefix, onChange }) => {
  return (
    <div className="mb-4">
      <Label htmlFor="namePrefix" className="text-sm">Custom Name Prefix</Label>
      <Input 
        id="namePrefix" 
        value={prefix} 
        onChange={onChange} 
        placeholder="Enter prefix (e.g. 'Team Member')"
        className="w-full"
      />
    </div>
  );
};

export default CustomNamePrefixInput;
