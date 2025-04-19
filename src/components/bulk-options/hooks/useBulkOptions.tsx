
import React, { useState, useEffect, useCallback } from 'react';
import { useRoster } from '@/context/RosterContext';
import { useToast } from '@/hooks/use-toast';
import { Player } from '@/types';

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
    console.log('useBulkOptions - Current player count:', players.length);
  }, [productInfo.products, selectedProductId, players.length]);
  
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
    console.log('Quick add selection:', count);
    setQuickAddCount(count);
  };
  
  const handleProductSelection = (productId: string) => {
    console.log('Product selected in handler:', productId);
    setSelectedProductId(productId);
  };
  
  // Function to add players with the given count - explicitly typed to return Player[]
  const addPlayersWithCount = useCallback((count: number): Player[] => {
    if (count <= 0) return [];
    
    console.log(`Adding ${count} players`);
    const newPlayers = addPlayers(count);
    console.log('New players added:', newPlayers);
    
    // If there's a selected product, assign it to the newly added players
    if (selectedProductId) {
      console.log(`Assigning product ${selectedProductId} to new players`);
      bulkAssignProductToPlayers(selectedProductId);
    }
    
    return newPlayers || []; // Ensure we always return an array
  }, [addPlayers, bulkAssignProductToPlayers, selectedProductId]);
  
  const handleApplyChanges = () => {
    console.log('Apply changes clicked with quickAddCount:', quickAddCount);
    let changesMade = false;
    let messages = [];
    
    try {
      // Apply quick add if selected
      if (quickAddCount && quickAddCount > 0) {
        const newPlayers = addPlayersWithCount(quickAddCount);
        
        if (newPlayers.length > 0) {
          messages.push(`Added ${quickAddCount} player${quickAddCount > 1 ? 's' : ''}`);
          setQuickAddCount(null); // Reset after applying
          changesMade = true;
        }
      } 
      // Apply product assignment if selected and there are players
      else if (selectedProductId && players.length > 0) {
        console.log(`Assigning product ${selectedProductId} to all players`);
        bulkAssignProductToPlayers(selectedProductId);
        const productName = productInfo.products.find(p => p.id === selectedProductId)?.name || 'Selected product';
        messages.push(`${productName} assigned to all players`);
        changesMade = true;
      }
      // Apply bulk options to existing players if no new players are being added
      else if (players.length > 0) {
        console.log('Applying bulk options to existing players');
        applyBulkOptions();
        messages.push("Bulk options applied to all players");
        changesMade = true;
      }
      // If no actions to apply, show an error message
      else {
        console.log('No actions to apply');
        toast({
          title: "No actions to apply",
          description: "Select quick add players, product assignment, or have existing players first.",
          variant: "destructive"
        });
        return;
      }
      
      // Show toast notification
      if (changesMade) {
        console.log('Changes made:', messages.join('. '));
        toast({
          title: "Changes applied",
          description: messages.join('. ')
        });
      }
    } catch (error) {
      console.error('Error applying changes:', error);
      toast({
        title: "Error applying changes",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
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
    handleNameCaseChange,
    handleNamePrefixChange,
    handleNumberPrefixChange,
    toggleOption,
    handleQuickAddSelection,
    handleProductSelection,
    handleApplyChanges,
    addPlayersWithCount
  };
};
