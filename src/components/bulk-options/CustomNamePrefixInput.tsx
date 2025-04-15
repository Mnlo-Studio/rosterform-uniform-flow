
import React from 'react';
import { Input } from '@/components/ui/input';

interface CustomNamePrefixInputProps {
  prefix: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomNamePrefixInput: React.FC<CustomNamePrefixInputProps> = ({ prefix, onChange }) => {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Custom Name Prefix</p>
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
