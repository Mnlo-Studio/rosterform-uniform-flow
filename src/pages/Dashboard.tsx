
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { mockOrders } from "@/data/mockOrders";
import OrderStatusOverview from "@/components/dashboard/OrderStatusOverview";
import SummaryStatistics from "@/components/dashboard/SummaryStatistics";

const Dashboard: React.FC = () => {
  // Mock user data - in a real application, this would come from context or API
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    savedRosters: [
      { id: "rst-001", name: "Basketball Team 2025", createdAt: "Feb 15, 2025" },
      { id: "rst-002", name: "Soccer Summer Camp", createdAt: "March 10, 2025" },
      { id: "rst-003", name: "Track & Field Event", createdAt: "March 22, 2025" },
    ]
  };

  // Using mock orders for the dashboard stats
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
              <h2>{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
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
      
      {/* Saved Rosters */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle>Saved Rosters</CardTitle>
        </CardHeader>
        <CardContent>
          {user.savedRosters.length === 0 ? (
            <p className="text-gray-600">You don't have any saved rosters yet.</p>
          ) : (
            <div className="space-y-4">
              {user.savedRosters.map((roster) => (
                <div key={roster.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{roster.name}</p>
                    <p className="text-sm text-gray-600">Created: {roster.createdAt}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Duplicate</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Embed Form */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle>Embed Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <p className="text-gray-800">Embed your order form into your website</p>
            <Button asChild className="bg-primary-700 hover:bg-primary-800">
              <Link to="/share">Get Embed Code</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
