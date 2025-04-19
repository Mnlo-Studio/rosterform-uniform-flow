
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRoster } from '@/context/RosterContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface OrderSummaryProps {
  isPublic?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ isPublic = false }) => {
  const { customerInfo, productInfo, players, calculateTotalPrice, resetRosterState } = useRoster();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalAmount = calculateTotalPrice();

  const handleSubmitOrder = async () => {
    // Form validation
    if (!customerInfo.teamName?.trim()) {
      toast.error('Please enter a team name');
      return;
    }
    if (!customerInfo.contactName?.trim()) {
      toast.error('Please enter a contact name');
      return;
    }
    if (!customerInfo.email?.trim()) {
      toast.error('Please enter an email address');
      return;
    }
    if (!customerInfo.phone?.trim()) {
      toast.error('Please enter a phone number');
      return;
    }
    if (!customerInfo.address?.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }
    if (!customerInfo.city?.trim()) {
      toast.error('Please enter a city');
      return;
    }
    if (!customerInfo.state?.trim()) {
      toast.error('Please enter a state');
      return;
    }
    if (!customerInfo.zipCode?.trim()) {
      toast.error('Please enter a zip code');
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
      // Generate order ID
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // User ID (use the actual user ID if logged in, or "public" for public forms)
      const userId = user?.id || 'public';
      
      // Create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_id: orderId,
          team_name: customerInfo.teamName,
          user_id: userId,
          total: totalAmount,
          status: 'Pending',
          date: new Date().toISOString(),
        })
        .select()
        .single();
      
      if (orderError) throw new Error(orderError.message);
      
      // Create customer info record in a custom table instead of using .from('customer_info')
      const { error: customerError } = await supabase
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
      
      if (customerError) throw new Error(customerError.message);
      
      // Create product records in the existing 'products' table instead of 'order_products'
      if (productInfo.products.length > 0) {
        const productsToInsert = productInfo.products.map(product => ({
          name: product.name,
          price_per_item: product.pricePerItem,
          notes: product.notes || null,
          images: product.images || [],
          user_id: userId,
        }));
        
        const { error: productsError } = await supabase
          .from('products')
          .insert(productsToInsert);
        
        if (productsError) throw new Error(productsError.message);
      }
      
      // Create player records in the existing 'players' table instead of 'order_players'
      if (players.length > 0) {
        const playersToInsert = players.map(player => ({
          name: player.name,
          number: player.number || null,
          size: player.size || null,
          gender: player.gender || null,
          product_id: player.productId || null,
          roster_id: order.id, // Connect players to the order using roster_id
        }));
        
        const { error: playersError } = await supabase
          .from('players')
          .insert(playersToInsert);
        
        if (playersError) throw new Error(playersError.message);
      }
      
      // Show success message
      toast.success('Order submitted successfully!');
      setSubmitted(true);
      
      if (!isPublic) {
        // For logged-in users, redirect to success page
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
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm border-gray-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
        <CardDescription>
          Review your order details before submitting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Team Name:</span>
              <span className="font-medium">{customerInfo.teamName || 'Not specified'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Contact:</span>
              <span className="font-medium">{customerInfo.contactName || 'Not specified'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Items:</span>
              <span className="font-medium">{players.length || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Products:</span>
              <span className="font-medium">{productInfo.products.length || 0}</span>
            </div>
            <div className="flex justify-between font-medium mt-2 text-base">
              <span>Total Amount:</span>
              <span className="text-primary">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          {submitted ? (
            <div className="bg-green-50 p-4 rounded-md mt-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <h3 className="font-medium text-green-800">Order Submitted Successfully!</h3>
              <p className="text-sm text-green-700 mt-1">
                {isPublic 
                  ? "Thank you for your order. We'll be in touch soon!"
                  : "You will be redirected to the confirmation page..."}
              </p>
            </div>
          ) : (
            <Button 
              className="w-full" 
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Order <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
