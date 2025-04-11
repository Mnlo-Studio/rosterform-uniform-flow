
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import DefaultOptionsSection from './DefaultOptionsSection';
import CustomNamePrefixInput from './CustomNamePrefixInput';
import ToggleOptionsSection from './ToggleOptionsSection';
import ToolbarHeader from './ToolbarHeader';

const BulkOptionsToolbar: React.FC = () => {
  const { bulkOptions, updateBulkOptions, players, applyBulkOptions } = useRoster();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleGenderChange = (value: string) => {
    updateBulkOptions({ defaultGender: value });
  };

  const handleSizeChange = (value: string) => {
    updateBulkOptions({ defaultSize: value });
  };

  const handleNumberFillChange = (value: 'manual' | 'odd' | 'even' | 'random') => {
    updateBulkOptions({ numberFillType: value });
  };

  const handleNamePrefixTypeChange = (value: 'none' | 'player' | 'custom') => {
    updateBulkOptions({ namePrefixType: value });
  };

  const handleNamePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBulkOptions({ namePrefix: e.target.value });
  };

  const handleNameCaseChange = (value: 'normal' | 'uppercase' | 'lowercase') => {
    updateBulkOptions({ nameCaseType: value });
  };

  const toggleOption = (option: keyof Pick<typeof bulkOptions, 'showShortsSize' | 'showSockSize' | 'showInitials'>) => {
    updateBulkOptions({ [option]: !bulkOptions[option] });
  };

  const handleApplyChanges = () => {
    if (players.length === 0) {
      toast({
        title: "No players to update",
        description: "Add players to the roster first before applying bulk options.",
        variant: "destructive"
      });
      return;
    }
    
    applyBulkOptions();
    
    toast({
      title: "Bulk options applied",
      description: "Changes have been applied to all players in the roster.",
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <ToolbarHeader onApplyChanges={handleApplyChanges} />
      
      <DefaultOptionsSection 
        bulkOptions={bulkOptions}
        onGenderChange={handleGenderChange}
        onSizeChange={handleSizeChange}
        onNumberFillChange={handleNumberFillChange}
        onNamePrefixTypeChange={handleNamePrefixTypeChange}
        onNameCaseChange={handleNameCaseChange}
      />
      
      {bulkOptions.namePrefixType === 'custom' && (
        <CustomNamePrefixInput 
          prefix={bulkOptions.namePrefix} 
          onChange={handleNamePrefixChange} 
        />
      )}
      
      <ToggleOptionsSection 
        bulkOptions={bulkOptions}
        isMobile={isMobile}
        onToggleOption={toggleOption}
      />
    </div>
  );
};

export default BulkOptionsToolbar;
