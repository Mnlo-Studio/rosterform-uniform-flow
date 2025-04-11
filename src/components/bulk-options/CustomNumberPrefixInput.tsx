
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CustomNumberPrefixInputProps {
  prefix: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomNumberPrefixInput: React.FC<CustomNumberPrefixInputProps> = ({ prefix, onChange }) => {
  return (
    <div>
      <Label htmlFor="numberPrefix" className="text-sm font-medium">Custom Number Prefix</Label>
      <Input 
        id="numberPrefix" 
        value={prefix} 
        onChange={onChange} 
        placeholder="Enter number prefix (e.g. '#')"
        className="w-full mt-1"
      />
    </div>
  );
};

export default CustomNumberPrefixInput;
