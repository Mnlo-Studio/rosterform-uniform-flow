
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DefaultOptionsSection from './DefaultOptionsSection';
import CustomNamePrefixInput from './CustomNamePrefixInput';
import CustomNumberPrefixInput from './CustomNumberPrefixInput';
import ToggleOptionsSection from './ToggleOptionsSection';
import QuickAddButtons from './QuickAddButtons';
import BulkProductAssignmentSection from './BulkProductAssignmentSection';

const BulkOptionsToolbar: React.FC = () => {
  const {
    bulkOptions,
    updateBulkOptions,
    players,
    applyBulkOptions,
    productInfo
  } = useRoster();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
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
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Bulk Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick add and bulk product in a 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quick add buttons */}
            <QuickAddButtons />
            
            {/* Bulk product assignment - only show if there are products available */}
            {productInfo.products.length > 0 && <BulkProductAssignmentSection />}
          </div>
          
          <DefaultOptionsSection 
            bulkOptions={bulkOptions} 
            onGenderChange={handleGenderChange} 
            onSizeChange={handleSizeChange} 
            onNumberFillChange={handleNumberFillChange} 
            onNamePrefixTypeChange={handleNamePrefixTypeChange} 
            onNameCaseChange={handleNameCaseChange} 
          />
          
          {/* Custom inputs in a 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 5. Custom Name Prefix */}
            {bulkOptions.namePrefixType === 'custom' && (
              <CustomNamePrefixInput prefix={bulkOptions.namePrefix} onChange={handleNamePrefixChange} />
            )}
            
            {/* 6. Custom Number Prefix */}
            {bulkOptions.numberFillType === 'custom' && (
              <CustomNumberPrefixInput prefix={bulkOptions.numberPrefix || ''} onChange={handleNumberPrefixChange} />
            )}
          </div>
          
          <ToggleOptionsSection 
            bulkOptions={bulkOptions} 
            isMobile={isMobile} 
            onToggleOption={toggleOption} 
          />

          <div className="flex justify-end mt-4">
            <Button onClick={handleApplyChanges} size="sm" className="bg-primary-700 hover:bg-primary-800">
              <Check size={16} className="mr-1" />
              Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkOptionsToolbar;
