
import React from 'react';
import { Input } from '@/components/ui/input';

interface CustomNumberPrefixInputProps {
  prefix: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomNumberPrefixInput: React.FC<CustomNumberPrefixInputProps> = ({ prefix, onChange }) => {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Custom Number Prefix</p>
      <Input 
        id="numberPrefix" 
        value={prefix} 
        onChange={onChange} 
        placeholder="Enter number prefix (e.g. '#')"
        className="w-full"
      />
    </div>
  );
};

export default CustomNumberPrefixInput;
