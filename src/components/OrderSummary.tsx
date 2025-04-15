
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { calculateTotalCost, calculateSizeBreakdown, calculateGenderBreakdown, formatCurrency } from '@/utils/calculations';
import SubmitOrderButton from './SubmitOrderButton';

const OrderSummary: React.FC = () => {
  const { players, productInfo } = useRoster();
  
  const totalPlayers = players.length;
  
  // Calculate total cost based on all products assigned to players
  const totalCost = calculateTotalCost(players, productInfo.products);
  const sizeBreakdown = calculateSizeBreakdown(players);
  const genderBreakdown = calculateGenderBreakdown(players);

  // Get the average price of all products (for display purposes)
  const averagePrice = productInfo.products.length 
    ? productInfo.products.reduce((sum, product) => sum + product.pricePerItem, 0) / productInfo.products.length 
    : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2 border-neutral-200">
            <span className="text-sm text-gray-500">Total Players:</span>
            <span className="font-semibold">{totalPlayers}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2 border-neutral-200">
            <span className="text-sm text-gray-500">Avg. Price Per Item:</span>
            <span className="font-semibold">{formatCurrency(averagePrice)}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-2 border-neutral-200">
            <span className="text-sm text-gray-500">Total Cost:</span>
            <span className="text-lg font-bold text-primary-700">{formatCurrency(totalCost)}</span>
          </div>
          
          {totalPlayers > 0 && (
            <>
              <div className="pt-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Size Breakdown:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(sizeBreakdown).map(([size, count]) => (
                    <div key={size} className="text-xs bg-gray-50 p-2 rounded flex justify-between border border-neutral-100">
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
                    <div key={gender} className="text-xs bg-gray-50 p-2 rounded flex justify-between border border-neutral-100">
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
        <SubmitOrderButton />
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
