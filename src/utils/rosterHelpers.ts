
import { Player } from '@/types';

// Helper function to generate random numbers
export const generateNumber = (fillType: 'odd' | 'even' | 'random', index: number, prefix?: string): string => {
  let baseNumber = '';
  
  if (fillType === 'odd') {
    baseNumber = `${index * 2 + 1}`;
  } else if (fillType === 'even') {
    baseNumber = `${(index + 1) * 2}`;
  } else {
    baseNumber = `${Math.floor(Math.random() * 99) + 1}`;
  }
  
  return prefix ? `${prefix}${baseNumber}` : baseNumber;
};

// Updated helper function to not append index for custom names
export const generateName = (
  prefixType: 'none' | 'player' | 'custom', 
  prefix: string, 
  index: number, 
  caseType: 'normal' | 'uppercase' | 'lowercase'
): string => {
  let name = '';
  if (prefixType === 'none') {
    name = '';
  } else if (prefixType === 'player') {
    name = `Player ${index + 1}`;
  } else {
    // For custom names, just use the prefix without appending a number
    name = prefix;
  }

  switch(caseType) {
    case 'uppercase':
      return name.toUpperCase();
    case 'lowercase':
      return name.toLowerCase();
    default:
      return name;
  }
};
