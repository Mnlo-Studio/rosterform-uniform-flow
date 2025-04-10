
import { Player, ProductInfo } from '@/types';

export const calculateTotalCost = (players: Player[], pricePerItem: number): number => {
  return players.length * pricePerItem;
};

export const calculateSizeBreakdown = (players: Player[]): Record<string, number> => {
  return players.reduce((acc, player) => {
    const size = player.size;
    if (size) {
      acc[size] = (acc[size] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
};

export const calculateGenderBreakdown = (players: Player[]): Record<string, number> => {
  return players.reduce((acc, player) => {
    const gender = player.gender;
    if (gender) {
      acc[gender] = (acc[gender] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
