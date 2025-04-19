
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Order } from "@/types/orders";
import { StatCard } from "./stats";
import { CheckCircle, XCircle, Clock, CreditCard, BanknoteIcon } from "lucide-react";

interface OrderStatusOverviewProps {
  orders: Order[];
}

const OrderStatusOverview: React.FC<OrderStatusOverviewProps> = ({ orders = [] }) => {
  // Calculate order status counts
  const paidOrders = orders.filter(order => order.isPaid).length;
  const unpaidOrders = orders.filter(order => !order.isPaid).length;
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;
  const completedOrders = orders.filter(order => order.status === 'Completed').length;
  const cancelledOrders = orders.filter(order => order.status === 'Cancelled').length;

  return (
    <Card className="shadow-card mb-6">
      <CardHeader>
        <CardTitle>Order Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <BanknoteIcon className="h-8 w-8 text-success-600 mb-2" />
            <span className="text-2xl font-bold">{paidOrders}</span>
            <StatusBadge status="paid" className="mt-1" />
          </div>
          
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <CreditCard className="h-8 w-8 text-error-600 mb-2" />
            <span className="text-2xl font-bold">{unpaidOrders}</span>
            <StatusBadge status="unpaid" className="mt-1" />
          </div>
          
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <Clock className="h-8 w-8 text-warning-600 mb-2" />
            <span className="text-2xl font-bold">{pendingOrders}</span>
            <StatusBadge status="pending" className="mt-1" />
          </div>
          
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-success-600 mb-2" />
            <span className="text-2xl font-bold">{completedOrders}</span>
            <StatusBadge status="success" label="Completed" className="mt-1" />
          </div>
          
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <XCircle className="h-8 w-8 text-error-600 mb-2" />
            <span className="text-2xl font-bold">{cancelledOrders}</span>
            <StatusBadge status="error" label="Cancelled" className="mt-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusOverview;
