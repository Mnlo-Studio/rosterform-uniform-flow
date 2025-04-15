
import React from 'react';

interface OrderDetailsLoadingProps {
  isMobile: boolean;
}

const OrderDetailsLoading: React.FC<OrderDetailsLoadingProps> = ({ isMobile }) => {
  return (
    <div className="p-4">Loading order details...</div>
  );
};

export default OrderDetailsLoading;
