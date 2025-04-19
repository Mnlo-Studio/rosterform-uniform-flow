
import { Player, CustomerInfo, ProductInfo, BulkOptions, Product } from '@/types';

export interface RosterContextType {
  players: Player[];
  customerInfo: CustomerInfo;
  productInfo: ProductInfo;
  bulkOptions: BulkOptions;
  addPlayers: (count: number) => Player[];
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, data: Partial<Player>) => void;
  updateCustomerInfo: (data: Partial<CustomerInfo>) => void;
  addProduct: () => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  moveProductUp: (id: string) => void;
  moveProductDown: (id: string) => void;
  assignProductToPlayer: (playerId: string, productId: string | undefined) => void;
  bulkAssignProductToPlayers: (productId: string) => void;
  updateBulkOptions: (data: Partial<BulkOptions>) => void;
  addImage: (productId: string, image: string) => void;
  removeImage: (productId: string, index: number) => void;
  applyBulkOptions: () => void;
  resetRoster: () => void;
  resetCustomerInfo: () => void;
  resetProductInfo: () => void;
  areAllPlayersAssignedProducts: () => boolean;
}
