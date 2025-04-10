
export type BulkOptions = {
  defaultGender: string;
  defaultSize: string;
  numberFillType: 'manual' | 'odd' | 'even' | 'random';
  namePrefixType: 'none' | 'player' | 'custom';
  namePrefix: string;
  nameCaseType: 'normal' | 'uppercase' | 'lowercase';
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
};
