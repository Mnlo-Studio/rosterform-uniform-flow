
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { validateOrderForm } from '../utils/orderValidation';
import { CustomerInfo, ProductInfo, Player } from '@/types';

interface UseOrderSubmissionProps {
  customerInfo: CustomerInfo;
  productInfo: ProductInfo;
  players: Player[];
  isPublic: boolean;
  resetRosterState: () => void;
}

export const useOrderSubmission = ({
  customerInfo,
  productInfo,
  players,
  isPublic,
  resetRosterState
}: UseOrderSubmissionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmitOrder = async () => {
    const validationError = validateOrderForm(customerInfo);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (productInfo.products.length === 0) {
      toast.error('Please add at least one product');
      return;
    }

    if (players.length === 0) {
      toast.error('Please add at least one player');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const userId = 'public';
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_id: orderId,
          team_name: customerInfo.teamName,
          user_id: userId,
          status: 'Pending',
          date: new Date().toISOString(),
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      await supabase
        .from('rosters')
        .insert({
          team_name: customerInfo.teamName,
          contact_name: customerInfo.contactName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address,
          city: customerInfo.city,
          state: customerInfo.state,
          zip_code: customerInfo.zipCode,
          user_id: userId,
        });
      
      if (productInfo.products.length > 0) {
        await supabase
          .from('products')
          .insert(productInfo.products.map(product => ({
            name: product.name,
            price_per_item: product.pricePerItem,
            notes: product.notes || null,
            images: product.images || [],
            user_id: userId,
          })));
      }
      
      if (players.length > 0) {
        await supabase
          .from('players')
          .insert(players.map(player => ({
            name: player.name,
            number: player.number,
            size: player.size,
            gender: player.gender,
            product_id: player.productId,
            roster_id: order.id,
          })));
      }
      
      toast.success('Order submitted successfully!');
      setSubmitted(true);
      
      if (!isPublic) {
        setTimeout(() => {
          resetRosterState();
          navigate('/success', { 
            state: { 
              orderId: orderId,
              teamName: customerInfo.teamName 
            } 
          });
        }, 1500);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error(`Failed to submit order: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitted,
    handleSubmitOrder
  };
};
