
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Design: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Design</h1>
      <p className="text-muted-foreground mb-6">Customize the look and feel of your forms.</p>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Themes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Customize the appearance of your roster forms.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Choose from pre-designed templates or create your own.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Design;
