
import { Player, CustomerInfo, ProductInfo } from './index';

export interface Order {
  orderId: string;
  teamName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  isPaid: boolean;
  players: Player[];
  customerInfo: CustomerInfo;
  productInfo: ProductInfo;
}
