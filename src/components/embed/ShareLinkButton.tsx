
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ShareLinkButtonProps {
  shareURL: string;
}

const ShareLinkButton: React.FC<ShareLinkButtonProps> = ({ shareURL }) => {
  const [copied, setCopied] = useState(false);
  
  // No need to replace anything, use the shareURL as is
  const publicFormURL = shareURL;
  
  const copyShareLink = () => {
    navigator.clipboard.writeText(publicFormURL);
    setCopied(true);
    toast.success("Share link copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const openShareLink = () => {
    window.open(publicFormURL, '_blank', 'noopener,noreferrer');
    toast.success("Opening order form in a new tab");
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
