
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

  // Fetch orders with improved error handling and caching
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      // If no user is authenticated, return empty array
      if (!userId) return [];
      
      console.log('Fetching orders for user ID:', userId);
      
      try {
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

        if (error) {
          console.error('Error fetching orders:', error);
          throw error;
        }
        
        console.log('Orders fetched:', data ? data.length : 0, 'orders');
        
        if (!data || data.length === 0) {
          return [];
        }
        
        // Handle potential error response for relations
        return data.map(order => {
          const orderData = {
            ...order,
            customer_info: Array.isArray(order.customer_info) && order.customer_info.length > 0 
              ? order.customer_info[0] 
              : order.customer_info || null,
            order_products: Array.isArray(order.order_products) ? order.order_products : [],
            order_players: Array.isArray(order.order_players) ? order.order_players : []
          };
          return mapDbOrderToOrder(orderData);
        });
      } catch (err) {
        console.error('Error in orders query:', err);
        // Return empty array instead of throwing to prevent UI from crashing
        return [];
      }
    },
    // Add caching and retry options for better performance
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
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
      
      console.log('Creating order with data:', preparedData);
      
      // Insert single row, not an array
      const { data, error } = await supabase
        .from('orders')
        .insert(preparedData)
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        throw error;
      }
      
      console.log('Order created successfully:', data);
      
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
      
      console.log('Updating order:', id, 'with data:', dbOrderData);
      
      const { data, error } = await supabase
        .from('orders')
        .update(dbOrderData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating order:', error);
        throw error;
      }
      
      console.log('Order updated successfully:', data);
      
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

  // Add a sample order function for development purposes
  const addSampleOrder = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not authenticated");
      
      const sampleOrder = {
        order_id: `ORD-SAMPLE-${Date.now()}`,
        team_name: 'Sample Team',
        total: 299.99,
        status: 'Pending',
        is_paid: false,
        user_id: userId,
        date: new Date().toISOString()
      };
      
      console.log('Creating sample order:', sampleOrder);
      
      const { data, error } = await supabase
        .from('orders')
        .insert(sampleOrder)
        .select()
        .single();

      if (error) {
        console.error('Error creating sample order:', error);
        throw error;
      }
      
      console.log('Sample order created:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', userId] });
      toast({
        title: "Sample order created",
        description: "A sample order has been added to your account.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating sample order",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  return {
    orders: orders || [],
    isLoading,
    error,
    createOrder,
    updateOrder,
    addSampleOrder
  };
};
