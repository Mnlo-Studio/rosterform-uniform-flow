
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface BulkOptionsFooterProps {
  onApply: () => void;
}

const BulkOptionsFooter: React.FC<BulkOptionsFooterProps> = ({ onApply }) => {
  return (
    <div className="flex justify-end mt-4">
      <Button onClick={onApply} size="sm" className="bg-primary-700 hover:bg-primary-800">
        <Check size={16} className="mr-1" />
        Apply
      </Button>
    </div>
  );
};

export default BulkOptionsFooter;
