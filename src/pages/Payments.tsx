
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Payments: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Payments</h1>
      <p className="text-muted-foreground mb-6">Manage your payment methods and transactions.</p>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No transactions found.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No payment methods found.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
