
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import OrderStatusOverview from "@/components/dashboard/OrderStatusOverview";
import SummaryStatistics from "@/components/dashboard/SummaryStatistics";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard: React.FC = () => {
  // Get authenticated user data from the auth context
  const { user } = useAuth();
  
  // Extract user information from Supabase user object
  const userData = {
    name: user?.user_metadata?.name || "User",
    email: user?.email || ""
  };

  // Use the useOrders hook to fetch actual user orders
  const { orders, isLoading } = useOrders();

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
      
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <>
          {/* Order Status Overview */}
          <OrderStatusOverview orders={orders || []} />
          
          {/* Summary Statistics */}
          <SummaryStatistics orders={orders || []} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
