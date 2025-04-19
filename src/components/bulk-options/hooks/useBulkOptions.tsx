
import { useCallback } from 'react';
import { useRoster } from '@/context/RosterContext';
import { useToast } from '@/hooks/use-toast';
import { useBulkOptionChanges } from './useBulkOptionChanges';
import { useQuickAdd } from './useQuickAdd';
import { useProductSelection } from './useProductSelection';

export const useBulkOptions = () => {
  const { bulkOptions, players, productInfo, applyBulkOptions, bulkAssignProductToPlayers } = useRoster();
  const { toast } = useToast();
  
  const {
    handleGenderChange,
    handleSizeChange,
    handleNumberFillChange,
    handleNamePrefixTypeChange,
    handleNamePrefixChange,
    handleNumberPrefixChange,
    handleNameCaseChange,
    toggleOption
  } = useBulkOptionChanges();

  const {
    quickAddCount,
    handleQuickAddSelection,
    addPlayersWithCount
  } = useQuickAdd();

  const {
    selectedProductId,
    handleProductSelection
  } = useProductSelection();
  
  const handleApplyChanges = useCallback(() => {
    console.log('Apply changes clicked with quickAddCount:', quickAddCount);
    let changesMade = false;
    let messages = [];
    
    try {
      // Apply quick add if selected
      if (quickAddCount && quickAddCount > 0) {
        const newPlayers = addPlayersWithCount(quickAddCount, selectedProductId);
        
        if (newPlayers && newPlayers.length > 0) {
          messages.push(`Added ${quickAddCount} player${quickAddCount > 1 ? 's' : ''}`);
          handleQuickAddSelection(0); // Reset after applying
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
  }, [
    quickAddCount,
    selectedProductId,
    players.length,
    addPlayersWithCount,
    productInfo.products,
    applyBulkOptions,
    toast,
    handleQuickAddSelection,
    bulkAssignProductToPlayers
  ]);

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
