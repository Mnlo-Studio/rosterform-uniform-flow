
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface GenderSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({
  id,
  value,
  onChange
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium text-gray-700 mb-1 block">
        Gender
      </label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger id={id} className="h-9">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GenderSelect;
