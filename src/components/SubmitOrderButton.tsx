
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Send, Download } from 'lucide-react';
import { useRoster } from '@/context/RosterContext';
import { useToast } from '@/hooks/use-toast';
import { generateOrderZip } from '@/utils/export';

const SubmitOrderButton: React.FC = () => {
  const { players, customerInfo, productInfo } = useRoster();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  
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
    if (productInfo.products.length === 0) {
      toast({
        title: "Missing product information",
        description: "Please add at least one product.",
        variant: "destructive"
      });
      return false;
    }
    
    const invalidProducts = productInfo.products.filter(product => 
      !product.name || product.pricePerItem <= 0
    );
    
    if (invalidProducts.length > 0) {
      toast({
        title: "Incomplete product information",
        description: `${invalidProducts.length} product(s) are missing required information.`,
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
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    // Log the order data for debugging
    console.log('Submitting order:', {
      customerInfo,
      productInfo,
      players
    });
    
    setIsGenerating(true);
    
    try {
      console.log('Attempting to generate order zip...');
      // Generate and download the order zip
      await generateOrderZip(customerInfo, players, productInfo);
      
      // Show success message
      toast({
        title: "Order files generated successfully!",
        description: "Your uniform order files have been downloaded. Thank you!",
      });
      
      // Navigate to success page
      navigate('/success', { state: { fromSuccess: true } });
    } catch (error) {
      console.error('Error generating order files:', error);
      toast({
        title: "Failed to generate files",
        description: "There was an error generating the order files. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="flex justify-end">
      <Button 
        onClick={handleSubmit}
        size="lg" 
        className="bg-blue-600 hover:bg-blue-700"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Download className="mr-2 h-5 w-5 animate-pulse" />
            Generating Files...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Submit Order
          </>
        )}
      </Button>
    </div>
  );
};

export default SubmitOrderButton;
