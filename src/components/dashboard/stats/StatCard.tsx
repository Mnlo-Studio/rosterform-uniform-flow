
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card className="shadow-card">
      <CardContent className="flex items-center p-6">
        <div className="mr-4 rounded-full bg-neutral-50 p-2">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-xl font-bold text-gray-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
