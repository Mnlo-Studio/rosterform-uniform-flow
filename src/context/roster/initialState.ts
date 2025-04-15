
import { CustomerInfo, ProductInfo, BulkOptions } from '@/types';

export const initialCustomerInfo: CustomerInfo = {
  teamName: '',
  contactName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};

export const initialProductInfo: ProductInfo = {
  products: [],
};

export const initialBulkOptions: BulkOptions = {
  defaultGender: 'Male',
  defaultSize: 'M',
  numberFillType: 'custom',
  numberPrefix: '',
  namePrefixType: 'custom',
  namePrefix: '',
  nameCaseType: 'normal',
  showName: true,
  showNumber: true,
  showShortsSize: false,
  showSockSize: false,
  showInitials: false,
};
