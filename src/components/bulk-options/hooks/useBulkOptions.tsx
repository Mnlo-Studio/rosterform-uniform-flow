
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
  
  // Debug logging
  useEffect(() => {
    console.log('useBulkOptions - Products:', productInfo.products);
    console.log('useBulkOptions - Selected Product ID:', selectedProductId);
  }, [productInfo.products, selectedProductId]);
  
  // Reset selectedProductId if it's no longer in the products list
  useEffect(() => {
    if (productInfo.products.length > 0) {
      // If selectedProductId doesn't exist in products, select first product
      if (selectedProductId && !productInfo.products.some(p => p.id === selectedProductId)) {
        console.log('Selected product no longer exists, selecting first product');
        setSelectedProductId(productInfo.products[0].id);
      } 
      // If no product is selected and products exist, select first product
      else if (!selectedProductId) {
        console.log('No product selected, selecting first product');
        setSelectedProductId(productInfo.products[0].id);
      }
    } else {
      // Clear selection if no products exist
      if (selectedProductId) {
        setSelectedProductId('');
      }
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
    console.log('Product selected in handler:', productId);
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
      // Add players with the selected product ID
      const newPlayers = addPlayers(quickAddCount);
      
      // If there's a selected product, assign it to the newly added players
      if (selectedProductId) {
        // We're using setTimeout to ensure the players are added first
        setTimeout(() => {
          bulkAssignProductToPlayers(selectedProductId);
        }, 0);
      }
      
      messages.push(`Added ${quickAddCount} player${quickAddCount > 1 ? 's' : ''}`);
      setQuickAddCount(null); // Reset after applying
      changesMade = true;
    }
    
    // Apply bulk product assignment if selected and there are players
    if (selectedProductId && players.length > 0) {
      bulkAssignProductToPlayers(selectedProductId);
      const productName = productInfo.products.find(p => p.id === selectedProductId)?.name || 'Selected product';
      messages.push(`${productName} assigned to all players`);
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
