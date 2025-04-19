import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, PlusIcon } from "lucide-react";
import OrderStatusOverview from "@/components/dashboard/OrderStatusOverview";
import SummaryStatistics from "@/components/dashboard/SummaryStatistics";
import StatsCards from "@/components/dashboard/StatsCards";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const userData = {
    name: user?.user_metadata?.name || "User",
    email: user?.email || ""
  };

  const { orders, isLoading, addSampleOrder } = useOrders();

  const totalOrders = orders?.length || 0;
  const totalPlayers = orders?.reduce((sum, order) => sum + (order.players?.length || 0), 0) || 0;
  const totalRevenue = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

  const handleCreateSampleOrder = async () => {
    try {
      await addSampleOrder.mutateAsync();
    } catch (error) {
      console.error('Error creating sample order:', error);
    }
  };

  const handleCreateNewOrder = () => {
    navigate('/order-form');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <h1 className="mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Manage your orders, statistics, and roster tools.</p>
      
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
      ) : orders && orders.length > 0 ? (
        <>
          <StatsCards 
            totalOrders={totalOrders} 
            totalPlayers={totalPlayers} 
            totalRevenue={totalRevenue} 
          />
          
          <OrderStatusOverview orders={orders} />
          
          <SummaryStatistics orders={orders} />
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 p-10 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-gray-50 rounded-full p-4">
              <PlusIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">No orders yet</h3>
            <p className="text-gray-500 max-w-md mb-4">
              You haven't created any orders yet. Create your first order or add a sample order to get started.
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={handleCreateNewOrder} 
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Create New Order
              </Button>
              <Button 
                variant="outline"
                onClick={handleCreateSampleOrder}
                className="flex items-center gap-2"
              >
                Add Sample Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
