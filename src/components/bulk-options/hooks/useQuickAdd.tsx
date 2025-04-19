
import { useState, useCallback } from 'react';
import { useRoster } from '@/context/RosterContext';
import { Player } from '@/types';

export const useQuickAdd = () => {
  const [quickAddCount, setQuickAddCount] = useState<number | null>(1); // Set default to 1
  const { addPlayers } = useRoster();

  const handleQuickAddSelection = (count: number) => {
    console.log('Quick add selection:', count);
    setQuickAddCount(count === 0 ? null : count);
  };

  const addPlayersWithCount = useCallback((count: number, selectedProductId?: string): Player[] => {
    if (!count || count <= 0) return [];
    
    console.log(`Adding ${count} players`);
    const newPlayers = addPlayers(count);
    console.log('New players added:', newPlayers);
    
    return newPlayers || []; // Ensure we always return an array
  }, [addPlayers]);

  return {
    quickAddCount,
    handleQuickAddSelection,
    addPlayersWithCount
  };
};
