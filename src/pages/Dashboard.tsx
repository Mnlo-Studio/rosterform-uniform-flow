
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit, Key, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCards from "@/components/dashboard/StatsCards";

const Dashboard: React.FC = () => {
  // Mock user data - in a real application, this would come from context or API
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    totalOrders: 12,
    totalPlayers: 48,
    totalRevenue: 3600,
    lastOrderDate: "March 25, 2025",
    savedRosters: [
      { id: "rst-001", name: "Basketball Team 2025", createdAt: "Feb 15, 2025" },
      { id: "rst-002", name: "Soccer Summer Camp", createdAt: "March 10, 2025" },
      { id: "rst-003", name: "Track & Field Event", createdAt: "March 22, 2025" },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-h2 font-bold tracking-tight mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-6">Manage your account, forms, and roster tools.</p>
      
      {/* User Info Card */}
      <Card className="mb-6 shadow-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-h3 font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-primary-700">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Cards */}
      <StatsCards 
        totalOrders={user.totalOrders} 
        totalPlayers={user.totalPlayers} 
        totalRevenue={user.totalRevenue} 
      />
      
      {/* Saved Rosters */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-h4">Saved Rosters</CardTitle>
        </CardHeader>
        <CardContent>
          {user.savedRosters.length === 0 ? (
            <p className="text-muted-foreground">You don't have any saved rosters yet.</p>
          ) : (
            <div className="space-y-4">
              {user.savedRosters.map((roster) => (
                <div key={roster.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{roster.name}</p>
                    <p className="text-sm text-muted-foreground">Created: {roster.createdAt}</p>
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
          <CardTitle className="text-h4">Embed Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <p>Embed your order form into your website</p>
            <Button asChild className="bg-primary-700 hover:bg-primary-800">
              <Link to="/share">Get Embed Code</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Account Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-h4">Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              <Button variant="link" className="h-auto p-0 text-primary-700">Change Password</Button>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-error-500" />
              <Button variant="link" className="h-auto p-0 text-error-500">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
