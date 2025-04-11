
import { Player, CustomerInfo, ProductInfo, BulkOptions } from '@/types';

export interface RosterContextType {
  players: Player[];
  customerInfo: CustomerInfo;
  productInfo: ProductInfo;
  bulkOptions: BulkOptions;
  addPlayers: (count: number) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, data: Partial<Player>) => void;
  updateCustomerInfo: (data: Partial<CustomerInfo>) => void;
  updateProductInfo: (data: Partial<ProductInfo>) => void;
  updateBulkOptions: (data: Partial<BulkOptions>) => void;
  addImage: (image: string) => void;
  removeImage: (index: number) => void;
  applyBulkOptions: () => void;
  resetRoster: () => void;
  resetCustomerInfo: () => void;
  resetProductInfo: () => void;
}
