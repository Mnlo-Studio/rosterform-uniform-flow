
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface BulkOptionsFooterProps {
  onApply: () => void;
}

const BulkOptionsFooter: React.FC<BulkOptionsFooterProps> = ({ onApply }) => {
  return (
    <div className="flex justify-end mt-4">
      <Button 
        onClick={onApply} 
        className="bg-primary-700 hover:bg-primary-800 text-white"
      >
        <Check size={16} className="mr-1" />
        Apply Changes
      </Button>
    </div>
  );
};

export default BulkOptionsFooter;
