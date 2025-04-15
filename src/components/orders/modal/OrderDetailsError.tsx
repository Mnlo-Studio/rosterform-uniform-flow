
import React from 'react';

interface OrderDetailsErrorProps {
  error: Error | null;
  isMobile: boolean;
}

const OrderDetailsError: React.FC<OrderDetailsErrorProps> = ({ error, isMobile }) => {
  return (
    <div className="p-4 text-red-500">
      Error loading order: {error?.message || 'Order not found'}
    </div>
  );
};

export default OrderDetailsError;
