
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Order } from '@/types/orders';

interface OrderDetailsHeaderProps {
  orderId: string;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  order?: Order;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  onStatusChange?: (status: 'Pending' | 'Completed' | 'Cancelled') => void;
  onPaymentChange?: (isPaid: boolean) => void;
}

const OrderDetailsHeader: React.FC<OrderDetailsHeaderProps> = ({
  orderId,
  isEditMode,
  onToggleEditMode,
  order,
  onEdit,
  onCancel,
  onSave,
  onStatusChange,
  onPaymentChange
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Link to="/orders">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Order Details: {orderId}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="edit-mode" className="cursor-pointer">Edit Mode</Label>
          <Switch 
            id="edit-mode" 
            checked={isEditMode} 
            onCheckedChange={onToggleEditMode}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsHeader;
