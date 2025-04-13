
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2, Check, Copy } from "lucide-react";
import { toast } from "sonner";

const ShareLinkButton: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const shareURL = "https://app.rosterform.com/form/roster-order-form";
  
  const copyShareLink = () => {
    navigator.clipboard.writeText(shareURL);
    setCopied(true);
    toast.success("Share link copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button 
      variant="outline" 
      className="gap-2" 
      onClick={copyShareLink}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Link2 className="h-4 w-4" />
          <span>Share Link</span>
        </>
      )}
    </Button>
  );
};

export default ShareLinkButton;
