
import React from 'react';
import { useRoster } from '@/context/RosterContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { calculateTotalCost, calculateSizeBreakdown, calculateGenderBreakdown, formatCurrency } from '@/utils/calculations';
import SubmitOrderButton from './SubmitOrderButton';

const OrderSummary: React.FC = () => {
  const { players, productInfo } = useRoster();
  
  const totalPlayers = players.length;
  const totalCost = calculateTotalCost(players, productInfo.pricePerItem);
  const sizeBreakdown = calculateSizeBreakdown(players);
  const genderBreakdown = calculateGenderBreakdown(players);

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
        <SubmitOrderButton />
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
