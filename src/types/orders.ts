
import { Database } from '@/integrations/supabase/types';

// Database type for orders table
export type DbOrder = Database['public']['Tables']['orders']['Row'];
export type DbCustomerInfo = {
  id: string;
  order_id: string;
  team_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  created_at: string;
  updated_at: string;
};

export type DbOrderProduct = {
  id: string;
  order_id: string;
  name: string;
  price_per_item: number;
  notes: string | null;
  images: string[] | null;
  created_at: string;
  updated_at: string;
};

export type DbOrderPlayer = {
  id: string;
  order_id: string;
  name: string;
  number: string | null;
  size: string | null;
  gender: string | null;
  created_at: string;
  updated_at: string;
};

// Frontend type with transformed properties
export interface Order {
  id: string;
  orderId: string;
  teamName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  isPaid: boolean;
  userId: string;
  customerInfo: CustomerInfo | null;
  products: ProductInfo[];
  players: Player[];
  productInfo: {
    products: ProductInfo[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CustomerInfo {
  id: string;
  contactName: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
}

export interface ProductInfo {
  id: string;
  name: string;
  pricePerItem: number;
  notes: string | null;
  images: string[] | null;
}

export interface Player {
  id: string;
  name: string;
  number: string | null;
  size: string | null;
  gender: string | null;
}

// Helper function to transform database order to frontend order
export const mapDbOrderToOrder = (
  dbOrder: DbOrder & {
    customer_info: DbCustomerInfo[] | null;
    order_products: DbOrderProduct[] | null;
    order_players: DbOrderPlayer[] | null;
  }
): Order => {
  const products = (dbOrder.order_products || []).map(product => ({
    id: product.id,
    name: product.name,
    pricePerItem: product.price_per_item,
    notes: product.notes,
    images: product.images,
  }));

  return {
    id: dbOrder.id,
    orderId: dbOrder.order_id,
    teamName: dbOrder.team_name,
    date: dbOrder.date,
    total: dbOrder.total,
    status: dbOrder.status as 'Pending' | 'Completed' | 'Cancelled',
    isPaid: dbOrder.is_paid,
    userId: dbOrder.user_id,
    createdAt: dbOrder.created_at,
    updatedAt: dbOrder.updated_at,
    customerInfo: dbOrder.customer_info && dbOrder.customer_info[0]
      ? {
          id: dbOrder.customer_info[0].id,
          contactName: dbOrder.customer_info[0].contact_name,
          email: dbOrder.customer_info[0].email,
          phone: dbOrder.customer_info[0].phone,
          address: dbOrder.customer_info[0].address,
          city: dbOrder.customer_info[0].city,
          state: dbOrder.customer_info[0].state,
          zipCode: dbOrder.customer_info[0].zip_code,
        }
      : null,
    products: products,
    productInfo: { products: products },
    players: (dbOrder.order_players || []).map(player => ({
      id: player.id,
      name: player.name,
      number: player.number,
      size: player.size,
      gender: player.gender,
    })),
  };
};

// Helper function to transform frontend order to database order
export const mapOrderToDbOrder = (order: Partial<Order>): Partial<DbOrder> => {
  const dbOrder: Partial<DbOrder> = {};
  
  if (order.id !== undefined) dbOrder.id = order.id;
  if (order.orderId !== undefined) dbOrder.order_id = order.orderId;
  if (order.teamName !== undefined) dbOrder.team_name = order.teamName;
  if (order.date !== undefined) dbOrder.date = order.date;
  if (order.total !== undefined) dbOrder.total = order.total;
  if (order.status !== undefined) dbOrder.status = order.status;
  if (order.isPaid !== undefined) dbOrder.is_paid = order.isPaid;
  if (order.userId !== undefined) dbOrder.user_id = order.userId;
  
  return dbOrder;
};
