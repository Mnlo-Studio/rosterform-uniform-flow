
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { calculateTotalCost, calculateSizeBreakdown, calculateGenderBreakdown, formatCurrency } from '@/utils/calculations';
import { useToast } from '@/hooks/use-toast';

const OrderSummary: React.FC = () => {
  const { players, customerInfo, productInfo } = useRoster();
  const { toast } = useToast();
  
  const totalPlayers = players.length;
  const totalCost = calculateTotalCost(players, productInfo.pricePerItem);
  const sizeBreakdown = calculateSizeBreakdown(players);
  const genderBreakdown = calculateGenderBreakdown(players);

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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm text-gray-500">Total Players:</span>
            <span className="font-semibold">{totalPlayers}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm text-gray-500">Price Per Item:</span>
            <span className="font-semibold">{formatCurrency(productInfo.pricePerItem)}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-sm text-gray-500">Total Cost:</span>
            <span className="text-lg font-bold text-blue-600">{formatCurrency(totalCost)}</span>
          </div>
          
          {totalPlayers > 0 && (
            <>
              <div className="pt-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Size Breakdown:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(sizeBreakdown).map(([size, count]) => (
                    <div key={size} className="text-xs bg-gray-50 p-2 rounded flex justify-between">
                      <span>{size}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Gender Breakdown:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(genderBreakdown).map(([gender, count]) => (
                    <div key={gender} className="text-xs bg-gray-50 p-2 rounded flex justify-between">
                      <span>{gender}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          size="lg" 
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <Send className="mr-2 h-5 w-5" />
          Submit Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;

