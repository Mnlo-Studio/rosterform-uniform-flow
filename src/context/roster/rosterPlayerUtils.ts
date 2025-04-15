
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
      : '',
    size: bulkOptions.defaultSize,
    gender: bulkOptions.defaultGender,
    shortsSize: bulkOptions.defaultSize,
    sockSize: bulkOptions.defaultSize,
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

    updatedPlayer.gender = bulkOptions.defaultGender;
    updatedPlayer.size = bulkOptions.defaultSize;

    if (bulkOptions.showShortsSize) {
      updatedPlayer.shortsSize = bulkOptions.defaultSize;
    }

    if (bulkOptions.showSockSize) {
      updatedPlayer.sockSize = bulkOptions.defaultSize;
    }

    if (bulkOptions.numberFillType !== 'custom') {
      updatedPlayer.number = generateNumber(
        bulkOptions.numberFillType,
        index,
        bulkOptions.numberPrefix
      );
    }

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
