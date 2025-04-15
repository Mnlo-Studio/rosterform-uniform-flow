
export type Player = {
  id: string;
  name: string;
  number: string;
  size: string;
  gender: string;
  shortsSize?: string;
  sockSize?: string;
  initials?: string;
};

export type CustomerInfo = {
  teamName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export type ProductInfo = {
  name: string;
  pricePerItem: number;
  notes: string;
  images: string[];
  productType?: string;
};

export type BulkOptions = {
  defaultGender: string;
  defaultSize: string;
  numberFillType: 'custom' | 'odd' | 'even' | 'random';
  numberPrefix?: string;
  namePrefixType: 'none' | 'player' | 'custom';
  namePrefix: string;
  nameCaseType: 'normal' | 'uppercase' | 'lowercase';
  showName: boolean;
  showNumber: boolean;
  showShortsSize: boolean;
  showSockSize: boolean;
  showInitials: boolean;
};
