
import React from "react";
import ShareLinkButton from "./ShareLinkButton";
import { Card } from "@/components/ui/card";

interface PageHeaderProps {
  shareURL: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ shareURL }) => {
  return (
    <div className="text-center mb-8">
      <h1>Share & Integrate Your Roster Form</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
        Choose from different embedding options to integrate your roster form into your website or application.
      </p>
      
      <Card className="mt-6 p-4 bg-gray-50 border-gray-200">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm font-medium">Your public share link:</p>
          <div className="px-4 py-2 bg-white border rounded-md text-sm font-mono w-full max-w-lg truncate">
            {shareURL}
          </div>
          <div className="flex justify-center">
            <ShareLinkButton shareURL={shareURL} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PageHeader;
