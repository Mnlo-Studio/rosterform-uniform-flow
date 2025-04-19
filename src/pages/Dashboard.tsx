
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { mockOrders } from "@/data/mockOrders";
import OrderStatusOverview from "@/components/dashboard/OrderStatusOverview";
import SummaryStatistics from "@/components/dashboard/SummaryStatistics";
import { useAuth } from "@/context/AuthContext";

const Dashboard: React.FC = () => {
  // Get authenticated user data from the auth context
  const { user } = useAuth();
  
  // Extract user information from Supabase user object
  const userData = {
    name: user?.user_metadata?.name || "User",
    email: user?.email || ""
  };

  // Using mock orders for the dashboard stats
  // In a real application, this would be fetched from your database
  const orders = mockOrders;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
      <h1 className="mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Manage your orders, statistics, and roster tools.</p>
      
      {/* User Info Card */}
      <Card className="mb-6 shadow-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <h2>{userData.name}</h2>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-primary-700">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Status Overview */}
      <OrderStatusOverview orders={orders} />
      
      {/* Summary Statistics */}
      <SummaryStatistics orders={orders} />
    </div>
  );
};

export default Dashboard;
