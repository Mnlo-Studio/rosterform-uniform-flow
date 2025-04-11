
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRoster } from '@/context/RosterContext';

const Success = () => {
  const navigate = useNavigate();
  const { resetRoster, resetCustomerInfo, resetProductInfo } = useRoster();

  const handleSameProduct = () => {
    resetRoster();
    resetCustomerInfo();
    navigate('/');
  };

  const handleSameRoster = () => {
    resetProductInfo();
    resetCustomerInfo();
    navigate('/');
  };

  const handleNewOrder = () => {
    resetRoster();
    resetProductInfo();
    resetCustomerInfo();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="pb-3 flex flex-col items-center">
          <CheckCircle className="h-24 w-24 text-green-500 mb-2" />
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Your order has been submitted!
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-4">
          <Button 
            onClick={handleSameProduct} 
            className="w-full"
            variant="default"
          >
            Submit another order with the same product
          </Button>
          <Button 
            onClick={handleSameRoster} 
            className="w-full" 
            variant="default"
          >
            Submit another order with the same roster
          </Button>
          <Button 
            onClick={handleNewOrder} 
            className="w-full" 
            variant="default"
          >
            Submit a new order
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center pt-0">
          <p className="text-sm text-gray-500">Thank you for your business!</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Success;
