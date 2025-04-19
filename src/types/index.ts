
export type Player = {
  id: string;
  name: string;
  number: string | null;
  size: string | null;
  gender: string | null;
  shortsSize?: string;
  sockSize?: string;
  initials?: string;
  productId?: string; // Link to product
};

export type CustomerInfo = {
  id?: string;
  contactName: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
};

export type Product = {
  id: string;
  name: string;
  pricePerItem: number;
  notes: string | null;
  images: string[] | null;
};

export type ProductInfo = {
  products: Product[];
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
