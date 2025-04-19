
import React from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

interface OrderSummaryContentProps {
  customerInfo: {
    teamName: string;
    contactName: string;
  };
  isSubmitting: boolean;
  submitted: boolean;
  totalAmount: number;
  productCount: number;
  playerCount: number;
  isPublic: boolean;
}

const OrderSummaryContent = ({
  customerInfo,
  isSubmitting,
  submitted,
  totalAmount,
  productCount,
  playerCount,
  isPublic
}: OrderSummaryContentProps) => {
  if (submitted) {
    return (
      <div className="bg-green-50 p-4 rounded-md mt-4 text-center">
        <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
        <h3 className="font-medium text-green-800">Order Submitted Successfully!</h3>
        <p className="text-sm text-green-700 mt-1">
          {isPublic 
            ? "Thank you for your order. We'll be in touch soon!"
            : "You will be redirected to the confirmation page..."}
        </p>
      </div>
    );
  }

  return (
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
          <span className="font-medium">{playerCount || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Products:</span>
          <span className="font-medium">{productCount || 0}</span>
        </div>
        <div className="flex justify-between font-medium mt-2 text-base">
          <span>Total Amount:</span>
          <span className="text-primary">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <button 
        className="w-full inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-primary-700 rounded-md hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Order'
        )}
      </button>
    </div>
  );
};

export default OrderSummaryContent;
