
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BulkOptions } from '@/types';

interface ToggleOptionsSectionProps {
  bulkOptions: BulkOptions;
  isMobile: boolean;
  onToggleOption: (option: keyof Pick<BulkOptions, 'showShortsSize' | 'showSockSize' | 'showInitials'>) => void;
}

const ToggleOptionsSection: React.FC<ToggleOptionsSectionProps> = ({ 
  bulkOptions, 
  isMobile, 
  onToggleOption 
}) => {
  return (
    <div className="flex flex-wrap gap-6 pt-2">
      <div className="flex items-center space-x-2">
        <Switch 
          id="showShortsSize" 
          checked={bulkOptions.showShortsSize}
          onCheckedChange={() => onToggleOption('showShortsSize')}
        />
        <Label htmlFor="showShortsSize" className="text-sm font-medium">Shorts Size</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="showSockSize" 
          checked={bulkOptions.showSockSize}
          onCheckedChange={() => onToggleOption('showSockSize')}
        />
        <Label htmlFor="showSockSize" className="text-sm font-medium">Sock Size</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="showInitials" 
          checked={bulkOptions.showInitials}
          onCheckedChange={() => onToggleOption('showInitials')}
        />
        <Label htmlFor="showInitials" className="text-sm font-medium">Initials</Label>
      </div>
    </div>
  );
};

export default ToggleOptionsSection;
