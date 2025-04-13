
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard, Users, DollarSign } from "lucide-react";
import { formatCurrency } from "@/utils/calculations";

interface StatsCardsProps {
  totalOrders: number;
  totalPlayers: number;
  totalRevenue: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
  totalOrders, 
  totalPlayers, 
  totalRevenue 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard 
        title="Total Orders" 
        value={totalOrders.toString()} 
        icon={<LayoutDashboard className="h-5 w-5 text-primary-600" />} 
      />
      <StatCard 
        title="Total Players" 
        value={totalPlayers.toString()} 
        icon={<Users className="h-5 w-5 text-primary-600" />} 
      />
      <StatCard 
        title="Total Revenue" 
        value={formatCurrency(totalRevenue)} 
        icon={<DollarSign className="h-5 w-5 text-success-500" />} 
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card className="shadow-card card-hover">
      <CardContent className="flex items-center p-6">
        <div className="mr-4 rounded-full bg-neutral-50 p-2">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <h3 className="text-h3 font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCards;
