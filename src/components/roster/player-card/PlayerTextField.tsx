
import React from 'react';
import { Input } from '@/components/ui/input';

interface PlayerTextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

const PlayerTextField: React.FC<PlayerTextFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  className
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="h-9"
      />
    </div>
  );
};

export default PlayerTextField;
