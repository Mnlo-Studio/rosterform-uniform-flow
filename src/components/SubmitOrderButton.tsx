
import React from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useRoster } from '@/context/RosterContext';
import { useToast } from '@/hooks/use-toast';

const SubmitOrderButton: React.FC = () => {
  const { players, customerInfo, productInfo } = useRoster();
  const { toast } = useToast();
  
  const validateForm = () => {
    // Validate customer info
    if (!customerInfo.teamName || !customerInfo.contactName || 
        !customerInfo.email || !customerInfo.phone || 
        !customerInfo.address || !customerInfo.city || 
        !customerInfo.state || !customerInfo.zipCode) {
      toast({
        title: "Missing customer information",
        description: "Please fill in all required customer fields.",
        variant: "destructive"
      });
      return false;
    }
    
    // Validate product info
    if (!productInfo.name || productInfo.pricePerItem <= 0) {
      toast({
        title: "Missing product information",
        description: "Please fill in all required product fields.",
        variant: "destructive"
      });
      return false;
    }
    
    // Validate roster
    if (players.length === 0) {
      toast({
        title: "Empty roster",
        description: "Please add at least one player to the roster.",
        variant: "destructive"
      });
      return false;
    }
    
    const invalidPlayers = players.filter(player => 
      !player.name || !player.number || !player.size || !player.gender
    );
    
    if (invalidPlayers.length > 0) {
      toast({
        title: "Incomplete player information",
        description: `${invalidPlayers.length} player(s) are missing required information.`,
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    // In a real app, we would submit the order data to a server
    console.log('Submitting order:', {
      customerInfo,
      productInfo,
      players
    });
    
    // Show success message
    toast({
      title: "Order submitted successfully!",
      description: "Your uniform order has been submitted. Thank you!",
    });
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-10">
      <Button 
        onClick={handleSubmit}
        size="lg" 
        className="px-6 bg-blue-600 hover:bg-blue-700"
      >
        <Send className="mr-2 h-5 w-5" />
        Submit Order
      </Button>
    </div>
  );
};

export default SubmitOrderButton;
