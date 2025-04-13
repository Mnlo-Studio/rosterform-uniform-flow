
import React from "react";
import { LayoutDashboard, Users, DollarSign } from "lucide-react";
import { formatCurrency } from "@/utils/calculations";
import { StatCard, StatCardGrid } from "./stats";

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
    <StatCardGrid>
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
    </StatCardGrid>
  );
};

export default StatsCards;
