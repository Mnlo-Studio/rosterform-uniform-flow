
import React from "react";
import { Separator } from "@/components/ui/separator";

const TipsAndTroubleshooting: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Tips & Troubleshooting</h3>
      <Separator className="mb-4" />
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-sm">Include Script Once</h4>
          <p className="text-sm text-muted-foreground">
            You only need to include the <code className="bg-muted px-1 py-0.5 rounded">&lt;script&gt;</code> tag once per page, even if you have multiple forms.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-sm">Multiple Forms</h4>
          <p className="text-sm text-muted-foreground">
            You can place multiple forms on the same page by using different <code className="bg-muted px-1 py-0.5 rounded">data-form-id</code> values.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-sm">Browser Compatibility</h4>
          <p className="text-sm text-muted-foreground">
            Our embed code is compatible with all modern browsers including Chrome, Firefox, Safari, and Edge.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-sm">Loading Issues</h4>
          <p className="text-sm text-muted-foreground">
            If the form doesn't appear, check your browser console for errors and ensure your page doesn't have any script blocking features enabled.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipsAndTroubleshooting;
