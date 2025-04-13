import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import DefaultOptionsSection from './DefaultOptionsSection';
import CustomNamePrefixInput from './CustomNamePrefixInput';
import CustomNumberPrefixInput from './CustomNumberPrefixInput';
import ToggleOptionsSection from './ToggleOptionsSection';
const BulkOptionsToolbar: React.FC = () => {
  const {
    bulkOptions,
    updateBulkOptions,
    players,
    applyBulkOptions
  } = useRoster();
  const isMobile = useIsMobile();
  const {
    toast
  } = useToast();
  const handleGenderChange = (value: string) => {
    updateBulkOptions({
      defaultGender: value
    });
  };
  const handleSizeChange = (value: string) => {
    updateBulkOptions({
      defaultSize: value
    });
  };
  const handleNumberFillChange = (value: 'custom' | 'odd' | 'even' | 'random') => {
    updateBulkOptions({
      numberFillType: value
    });
  };
  const handleNamePrefixTypeChange = (value: 'none' | 'player' | 'custom') => {
    updateBulkOptions({
      namePrefixType: value
    });
  };
  const handleNamePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBulkOptions({
      namePrefix: e.target.value
    });
  };
  const handleNumberPrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBulkOptions({
      numberPrefix: e.target.value
    });
  };
  const handleNameCaseChange = (value: 'normal' | 'uppercase' | 'lowercase') => {
    updateBulkOptions({
      nameCaseType: value
    });
  };
  const toggleOption = (option: keyof Pick<typeof bulkOptions, 'showName' | 'showNumber' | 'showShortsSize' | 'showSockSize' | 'showInitials'>) => {
    updateBulkOptions({
      [option]: !bulkOptions[option]
    });
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
      description: "Changes have been applied to all players in the roster."
    });
  };
  return <div className="p-5 rounded-lg shadow-sm mb-8 bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">Bulk Options</h3>
      
      <div className="space-y-5">
        <DefaultOptionsSection bulkOptions={bulkOptions} onGenderChange={handleGenderChange} onSizeChange={handleSizeChange} onNumberFillChange={handleNumberFillChange} onNamePrefixTypeChange={handleNamePrefixTypeChange} onNameCaseChange={handleNameCaseChange} />
        
        {/* 5. Custom Name Prefix */}
        {bulkOptions.namePrefixType === 'custom' && <CustomNamePrefixInput prefix={bulkOptions.namePrefix} onChange={handleNamePrefixChange} />}
        
        {/* 6. Custom Number Prefix */}
        {bulkOptions.numberFillType === 'custom' && <CustomNumberPrefixInput prefix={bulkOptions.numberPrefix || ''} onChange={handleNumberPrefixChange} />}
        
        <ToggleOptionsSection bulkOptions={bulkOptions} isMobile={isMobile} onToggleOption={toggleOption} />

        <div className="flex justify-end mt-4">
          <Button onClick={handleApplyChanges} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Check size={16} className="mr-1" />
            Apply
          </Button>
        </div>
      </div>
    </div>;
};
export default BulkOptionsToolbar;