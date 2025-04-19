
import React from "react";
import ShareLinkButton from "./ShareLinkButton";

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
      <div className="mt-4 flex justify-center">
        <ShareLinkButton shareURL={shareURL} />
      </div>
    </div>
  );
};

export default PageHeader;
