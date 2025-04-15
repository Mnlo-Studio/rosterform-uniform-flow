
import React, { useState } from 'react';
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
    productInfo,
    addPlayers,
    bulkAssignProductToPlayers
  } = useRoster();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // State for storing pending actions
  const [quickAddCount, setQuickAddCount] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  
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
  
  const handleQuickAddSelection = (count: number) => {
    setQuickAddCount(count);
  };
  
  const handleProductSelection = (productId: string) => {
    setSelectedProductId(productId);
  };
  
  const handleApplyChanges = () => {
    let changesMade = false;
    let messages = [];
    
    // Check if there are any players before applying changes
    if (players.length === 0 && !quickAddCount) {
      toast({
        title: "No players to update",
        description: "Add players to the roster first before applying bulk options.",
        variant: "destructive"
      });
      return;
    }
    
    // Apply quick add if selected
    if (quickAddCount) {
      addPlayers(quickAddCount);
      messages.push(`Added ${quickAddCount} player${quickAddCount > 1 ? 's' : ''}`);
      setQuickAddCount(null); // Reset after applying
      changesMade = true;
    }
    
    // Apply bulk product assignment if selected
    if (selectedProductId && players.length > 0) {
      bulkAssignProductToPlayers(selectedProductId);
      messages.push("Product assigned to all players");
      setSelectedProductId(''); // Reset after applying
      changesMade = true;
    }
    
    // Apply other bulk options
    if (players.length > 0) {
      applyBulkOptions();
      messages.push("Bulk options applied to all players");
      changesMade = true;
    }
    
    // Show toast notification
    if (changesMade) {
      toast({
        title: "Changes applied",
        description: messages.join('. ')
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Bulk Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* First row: Quick add and bulk product */}
            <QuickAddButtons 
              onSelectQuickAdd={handleQuickAddSelection} 
              selectedCount={quickAddCount}
            />
            
            {/* Bulk product assignment - only show if there are products available */}
            {productInfo.products.length > 0 && (
              <BulkProductAssignmentSection 
                selectedProductId={selectedProductId}
                onProductSelect={handleProductSelection}
              />
            )}
          
            {/* Second row: Default Gender and Size */}
            <div>
              <label htmlFor="defaultGender" className="text-sm font-medium mb-2 block">Default Gender</label>
              <DefaultOptionsSection.GenderSelect 
                value={bulkOptions.defaultGender} 
                onChange={handleGenderChange} 
              />
            </div>
            
            <div>
              <label htmlFor="defaultSize" className="text-sm font-medium mb-2 block">Default Size</label>
              <DefaultOptionsSection.SizeSelect 
                value={bulkOptions.defaultSize} 
                onChange={handleSizeChange} 
              />
            </div>
            
            {/* Third row: Name Auto-Fill and Number Auto-Fill */}
            <div>
              <label htmlFor="namePrefixType" className="text-sm font-medium mb-2 block">Name Auto-Fill</label>
              <DefaultOptionsSection.NamePrefixSelect 
                value={bulkOptions.namePrefixType} 
                onChange={handleNamePrefixTypeChange} 
              />
            </div>
            
            <div>
              <label htmlFor="numberFill" className="text-sm font-medium mb-2 block">Number Auto-Fill</label>
              <DefaultOptionsSection.NumberFillSelect 
                value={bulkOptions.numberFillType} 
                onChange={handleNumberFillChange} 
              />
            </div>
            
            {/* Fourth row: Name Case (left column only) */}
            <div>
              <label htmlFor="nameCaseType" className="text-sm font-medium mb-2 block">Name Case</label>
              <DefaultOptionsSection.NameCaseSelect 
                value={bulkOptions.nameCaseType} 
                onChange={handleNameCaseChange} 
              />
            </div>
            
            {/* No element in right column of fourth row */}
            <div></div>
            
            {/* Fifth row: Custom inputs (only shown conditionally) */}
            {bulkOptions.namePrefixType === 'custom' && (
              <div>
                <CustomNamePrefixInput prefix={bulkOptions.namePrefix} onChange={handleNamePrefixChange} />
              </div>
            )}
            
            {bulkOptions.numberFillType === 'custom' && (
              <div>
                <CustomNumberPrefixInput prefix={bulkOptions.numberPrefix || ''} onChange={handleNumberPrefixChange} />
              </div>
            )}
          </div>
          
          {/* Toggle options section for Name, Number, etc. */}
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
