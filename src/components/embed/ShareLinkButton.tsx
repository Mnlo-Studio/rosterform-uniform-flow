
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ShareLinkButtonProps {
  shareURL: string;
}

const ShareLinkButton: React.FC<ShareLinkButtonProps> = ({ shareURL }) => {
  const [copied, setCopied] = useState(false);
  
  // Now we have two options for sharing:
  // 1. A standalone form at /form (no authentication required)
  // 2. A customer-specific form at /order/:formId
  
  // The standalone form URL is simpler
  const standaloneFormURL = `${window.location.origin}/form`;
  
  // The customer-specific form URL (from the original prop)
  const customerFormURL = shareURL.replace('/order/', '/form/');
  
  // Default to the standalone form for sharing
  const publicFormURL = standaloneFormURL;
  
  const copyShareLink = () => {
    navigator.clipboard.writeText(publicFormURL);
    setCopied(true);
    toast.success("Share link copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const openShareLink = () => {
    // Open in a new tab
    window.open(publicFormURL, '_blank', 'noopener,noreferrer');
    toast.success("Opening public form in a new tab");
  };

  return (
    <div className="flex gap-2">
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
            <span>Copy Link</span>
          </>
        )}
      </Button>
      
      <Button 
        variant="outline" 
        className="gap-2" 
        onClick={openShareLink}
      >
        <ExternalLink className="h-4 w-4" />
        <span>Open Link</span>
      </Button>
    </div>
  );
};

export default ShareLinkButton;
