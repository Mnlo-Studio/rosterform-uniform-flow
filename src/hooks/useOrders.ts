
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  Order, 
  DbOrder, 
  mapDbOrderToOrder, 
  mapOrderToDbOrder 
} from '@/types/orders';
import { useAuth } from '@/context/AuthContext';

export const useOrders = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  // Fetch orders
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      // If no user is authenticated, return empty array
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer_info (*),
          order_products (*),
          order_players (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Handle potential error response for relations
      return data.map(order => {
        const orderData = {
          ...order,
          customer_info: Array.isArray(order.customer_info) ? order.customer_info : null,
          order_products: Array.isArray(order.order_products) ? order.order_products : [],
          order_players: Array.isArray(order.order_players) ? order.order_players : []
        };
        return mapDbOrderToOrder(orderData);
      });
    },
    enabled: !!userId, // Only run query when userId is available
  });

  // Create order
  const createOrder = useMutation({
    mutationFn: async (orderData: Partial<Order>) => {
      // Convert frontend order to database format
      const dbOrderData = mapOrderToDbOrder(orderData);
      
      // The key issue here was that we need to ensure required fields are provided
      // For Supabase, order_id and team_name are required fields
      const preparedData = {
        ...dbOrderData,
        // Ensure required fields are provided
        order_id: dbOrderData.order_id || `ORD-${Date.now()}`,
        team_name: dbOrderData.team_name || 'Untitled Team',
        user_id: userId || '00000000-0000-0000-0000-000000000000'
      };
      
      // Insert single row, not an array
      const { data, error } = await supabase
        .from('orders')
        .insert(preparedData)
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
      queryClient.invalidateQueries({ queryKey: ['orders', userId] });
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
      queryClient.invalidateQueries({ queryKey: ['orders', userId] });
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
