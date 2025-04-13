
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
        icon={<ShoppingBag className="h-8 w-8 text-blue-500" />} 
      />
      <SummaryCard 
        title="Total Revenue" 
        value={formatCurrency(totalRevenue)} 
        icon={<DollarSign className="h-8 w-8 text-green-500" />} 
      />
      <SummaryCard 
        title="Total Players" 
        value={totalPlayers.toString()}
        icon={<Users className="h-8 w-8 text-purple-500" />} 
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
  <Card className="shadow-sm hover:shadow transition-shadow bg-white">
    <CardContent className="flex items-center p-6">
      <div className="mr-4 rounded-full bg-gray-50 p-3">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </CardContent>
  </Card>
);

export default OrdersSummaryCards;
