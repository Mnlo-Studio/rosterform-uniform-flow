
import React from 'react';
import { ShoppingBag, DollarSign, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/calculations';

interface OrdersSummaryCardsProps {
  totalOrders: number;
  totalRevenue: number;
  totalPlayers: number;
}

const OrdersSummaryCards: React.FC<OrdersSummaryCardsProps> = ({
  totalOrders,
  totalRevenue,
  totalPlayers
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <SummaryCard 
        title="Total Orders" 
        value={totalOrders.toString()} 
        icon={<ShoppingBag className="h-8 w-8 text-primary-700" />} 
      />
      <SummaryCard 
        title="Total Revenue" 
        value={formatCurrency(totalRevenue)} 
        icon={<DollarSign className="h-8 w-8 text-success-700" />} 
      />
      <SummaryCard 
        title="Total Players" 
        value={totalPlayers.toString()}
        icon={<Users className="h-8 w-8 text-purple-700" />} 
      />
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow bg-white border-neutral-200">
    <CardContent className="flex items-center p-6">
      <div className="mr-4 rounded-full bg-neutral-50 p-3">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-neutral-600">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </CardContent>
  </Card>
);

export default OrdersSummaryCards;
