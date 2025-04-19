
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Order, 
  DbOrder, 
  mapDbOrderToOrder, 
  mapOrderToDbOrder 
} from '@/types/orders';

export const useOrders = () => {
  const queryClient = useQueryClient();

  // Fetch orders
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer_info (*),
          order_products (*),
          order_players (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform database data to frontend format
      return data.map(order => mapDbOrderToOrder({
        ...order,
        customer_info: Array.isArray(order.customer_info) ? order.customer_info : null,
        order_products: Array.isArray(order.order_products) ? order.order_products : [],
        order_players: Array.isArray(order.order_players) ? order.order_players : []
      }));
    },
  });

  // Create order
  const createOrder = useMutation({
    mutationFn: async (orderData: Partial<Order>) => {
      // Convert frontend order to database format
      const dbOrderData = mapOrderToDbOrder(orderData);
      
      const { data, error } = await supabase
        .from('orders')
        .insert([dbOrderData])
        .select()
        .single();

      if (error) throw error;
      
      // Map the response back to frontend format
      return mapDbOrderToOrder({
        ...data,
        customer_info: null,
        order_products: [],
        order_players: []
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order created",
        description: "Your order has been successfully created.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update order
  const updateOrder = useMutation({
    mutationFn: async ({ id, ...orderData }: Partial<Order> & { id: string }) => {
      // Convert frontend order to database format
      const dbOrderData = mapOrderToDbOrder(orderData);
      
      const { data, error } = await supabase
        .from('orders')
        .update(dbOrderData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Map the response back to frontend format
      return mapDbOrderToOrder({
        ...data,
        customer_info: null,
        order_products: [],
        order_players: []
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order updated",
        description: "Your order has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    orders,
    isLoading,
    error,
    createOrder,
    updateOrder,
  };
};
