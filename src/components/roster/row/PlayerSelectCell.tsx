
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface PlayerSelectCellProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Array<{value: string, label: string}>;
}

const PlayerSelectCell: React.FC<PlayerSelectCellProps> = ({
  value,
  onChange,
  placeholder,
  options
}) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="h-8">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PlayerSelectCell;
