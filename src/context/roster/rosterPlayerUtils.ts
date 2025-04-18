
import { Player, BulkOptions } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { generateNumber, generateName } from '@/utils/rosterHelpers';

// Create new players based on count and bulk options
export const createPlayers = (
  count: number,
  existingCount: number,
  bulkOptions: BulkOptions,
  defaultProductId?: string
): Player[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: uuidv4(),
    name: generateName(
      bulkOptions.namePrefixType,
      bulkOptions.namePrefix,
      existingCount + index,
      bulkOptions.nameCaseType
    ),
    number: bulkOptions.numberFillType !== 'custom'
      ? generateNumber(bulkOptions.numberFillType, existingCount + index, bulkOptions.numberPrefix)
      : bulkOptions.numberPrefix || '',
    size: bulkOptions.defaultSize,
    gender: bulkOptions.defaultGender,
    shortsSize: bulkOptions.showShortsSize ? bulkOptions.defaultSize : '',
    sockSize: bulkOptions.showSockSize ? bulkOptions.defaultSize : '',
    initials: '',
    productId: defaultProductId,
  }));
};

// Apply bulk options to all players
export const applyBulkOptionsToPlayers = (
  players: Player[],
  bulkOptions: BulkOptions
): Player[] => {
  if (players.length === 0) return players;

  return players.map((player, index) => {
    const updatedPlayer = { ...player };

    // Always apply these default options
    updatedPlayer.gender = bulkOptions.defaultGender;
    updatedPlayer.size = bulkOptions.defaultSize;

    // Apply conditional fields if they're shown/enabled
    if (bulkOptions.showShortsSize) {
      updatedPlayer.shortsSize = bulkOptions.defaultSize;
    }

    if (bulkOptions.showSockSize) {
      updatedPlayer.sockSize = bulkOptions.defaultSize;
    }

    // Apply number generation based on settings - IMPORTANT: Always replace the number instead of appending
    if (bulkOptions.numberFillType !== 'custom') {
      // Generate a new number using the pattern, replacing any existing number
      updatedPlayer.number = generateNumber(
        bulkOptions.numberFillType,
        index,
        bulkOptions.numberPrefix
      );
    } else if (bulkOptions.numberPrefix) {
      // If custom is selected, use just the prefix as the full number value
      updatedPlayer.number = bulkOptions.numberPrefix;
    } else {
      // If custom with empty prefix, clear the number
      updatedPlayer.number = '';
    }

    // Apply name generation based on settings
    if (bulkOptions.namePrefixType !== 'none') {
      updatedPlayer.name = generateName(
        bulkOptions.namePrefixType,
        bulkOptions.namePrefix,
        index,
        bulkOptions.nameCaseType
      );
    }

    return updatedPlayer;
  });
};
