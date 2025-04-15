
import React, { useState, useEffect } from 'react';
import { useRoster } from '@/context/RosterContext';
import { useToast } from '@/hooks/use-toast';

export const useBulkOptions = () => {
  const {
    bulkOptions,
    updateBulkOptions,
    players,
    applyBulkOptions,
    productInfo,
    addPlayers,
    bulkAssignProductToPlayers
  } = useRoster();
  const { toast } = useToast();
  
  // State for storing pending actions
  const [quickAddCount, setQuickAddCount] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  
  // Reset states when product info changes to force re-rendering of dropdown
  useEffect(() => {
    // Only reset selectedProductId if it's not present in the products list
    if (selectedProductId && 
        productInfo.products.length > 0 && 
        !productInfo.products.some(p => p.id === selectedProductId)) {
      setSelectedProductId('');
    }
  }, [productInfo.products, selectedProductId]);
  
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
    let applyBulkOptionsToExisting = false;
    
    // Check if there are any selections or actions to apply
    if (!quickAddCount && !selectedProductId && players.length === 0) {
      toast({
        title: "No actions to apply",
        description: "Select quick add players, product assignment, or have existing players first.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if the user wants to apply bulk options to existing players
    if (players.length > 0 && !quickAddCount) {
      applyBulkOptionsToExisting = true;
    }
    
    // Apply quick add if selected (without modifying existing players)
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
    
    // Apply other bulk options to existing players ONLY if explicitly requested
    // (no new players are being added)
    if (applyBulkOptionsToExisting) {
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

  return {
    bulkOptions,
    quickAddCount,
    selectedProductId,
    productInfo,
    players,
    handleGenderChange,
    handleSizeChange,
    handleNumberFillChange,
    handleNamePrefixTypeChange,
    handleNamePrefixChange,
    handleNumberPrefixChange,
    handleNameCaseChange,
    toggleOption,
    handleQuickAddSelection,
    handleProductSelection,
    handleApplyChanges
  };
};
