
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRoster } from '@/context/RosterContext';
import OrderSummaryContent from './orders/OrderSummaryContent';
import { useOrderSubmission } from './orders/hooks/useOrderSubmission';

interface OrderSummaryProps {
  isPublic?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ isPublic = false }) => {
  const { customerInfo, productInfo, players, resetRosterState } = useRoster();

  const {
    isSubmitting,
    submitted,
    handleSubmitOrder
  } = useOrderSubmission({
    customerInfo,
    productInfo,
    players,
    isPublic,
    resetRosterState
  });

  const totalAmount = productInfo.products.reduce((acc, product) => {
    return acc + product.pricePerItem;
  }, 0);

  return (
    <Card className="shadow-sm border-gray-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
        <CardDescription>
          Review your order details before submitting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OrderSummaryContent
          customerInfo={customerInfo}
          isSubmitting={isSubmitting}
          submitted={submitted}
          totalAmount={totalAmount}
          productCount={productInfo.products.length}
          playerCount={players.length}
          isPublic={isPublic}
        />
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
