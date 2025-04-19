
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, PlusCircle } from "lucide-react";
import OrderStatusOverview from "@/components/dashboard/OrderStatusOverview";
import SummaryStatistics from "@/components/dashboard/SummaryStatistics";
import StatsCards from "@/components/dashboard/StatsCards";
import PublicFormList from "@/components/share/PublicFormList";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { orders, isLoading, addSampleOrder } = useOrders();

  const totalOrders = orders?.length || 0;
  const totalPlayers = orders?.reduce((sum, order) => sum + (order.players?.length || 0), 0) || 0;
  const totalRevenue = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

  const handleCreateNewOrder = () => {
    navigate('/order-form');
  };

  const handleEditProfile = () => {
    navigate('/account');
  };

  const handleCreateSampleOrder = async () => {
    try {
      await addSampleOrder.mutateAsync();
      navigate('/orders');
    } catch (error) {
      console.error('Error creating sample order:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Card className="bg-white shadow-sm border-gray-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                Welcome{user?.user_metadata?.name ? `, ${user.user_metadata.name}` : ''}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your orders and team forms from your dashboard
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-gray-600 hidden sm:flex"
              onClick={handleEditProfile}
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-6">
          <StatsCards
            totalOrders={totalOrders}
            totalPlayers={totalPlayers}
            totalRevenue={totalRevenue}
          />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <OrderStatusOverview orders={orders} />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <PublicFormList />
            </div>
          </div>

          <SummaryStatistics orders={orders} />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 p-8 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-gray-50 rounded-full p-4">
              <PlusCircle className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium">No orders yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mt-2 mb-6">
                You haven't created any orders yet. Create your first order or add a sample order to get started.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleCreateNewOrder}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Create New Order
              </Button>
              <Button
                variant="outline"
                onClick={handleCreateSampleOrder}
                disabled={addSampleOrder.isPending}
              >
                {addSampleOrder.isPending ? "Creating..." : "Add Sample Order"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
