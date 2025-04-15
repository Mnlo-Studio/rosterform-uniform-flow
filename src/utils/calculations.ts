
import { Player, ProductInfo, Product } from '@/types';

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const calculateTotalCost = (players: Player[], products: Product[]): number => {
  return players.reduce((total, player) => {
    if (player.productId) {
      const product = products.find(p => p.id === player.productId);
      if (product) {
        return total + product.pricePerItem;
      }
    }
    return total;
  }, 0);
};

export const calculateSizeBreakdown = (players: Player[]): Record<string, number> => {
  const breakdown: Record<string, number> = {};

  players.forEach(player => {
    const size = player.size;
    breakdown[size] = (breakdown[size] || 0) + 1;
  });

  return breakdown;
};

export const calculateGenderBreakdown = (players: Player[]): Record<string, number> => {
  const breakdown: Record<string, number> = {};

  players.forEach(player => {
    const gender = player.gender;
    breakdown[gender] = (breakdown[gender] || 0) + 1;
  });

  return breakdown;
};
