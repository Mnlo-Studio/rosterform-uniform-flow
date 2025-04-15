
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface SizeSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

const SizeSelect: React.FC<SizeSelectProps> = ({
  id,
  value,
  onChange,
  label,
  className
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger id={id} className="h-9">
          <SelectValue placeholder="Size" />
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
  );
};

export default SizeSelect;
