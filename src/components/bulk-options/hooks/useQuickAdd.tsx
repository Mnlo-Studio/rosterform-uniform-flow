
import { useState, useCallback } from 'react';
import { useRoster } from '@/context/RosterContext';
import { Player } from '@/types';

export const useQuickAdd = () => {
  const [quickAddCount, setQuickAddCount] = useState<number | null>(null);
  const { addPlayers, bulkAssignProductToPlayers } = useRoster();

  const handleQuickAddSelection = (count: number) => {
    console.log('Quick add selection:', count);
    setQuickAddCount(count === 0 ? null : count);
  };

  const addPlayersWithCount = useCallback((count: number, selectedProductId?: string): Player[] => {
    if (!count || count <= 0) return [];
    
    console.log(`Adding ${count} players`);
    const newPlayers = addPlayers(count);
    console.log('New players added:', newPlayers);
    
    // If there's a selected product, assign it to the newly added players
    if (selectedProductId) {
      console.log(`Assigning product ${selectedProductId} to new players`);
      bulkAssignProductToPlayers(selectedProductId);
    }
    
    return newPlayers || []; // Ensure we always return an array
  }, [addPlayers, bulkAssignProductToPlayers]);

  return {
    quickAddCount,
    handleQuickAddSelection,
    addPlayersWithCount
  };
};
