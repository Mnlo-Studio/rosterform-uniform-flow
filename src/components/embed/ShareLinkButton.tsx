
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareLinkButtonProps {
  shareURL: string;
}

const ShareLinkButton: React.FC<ShareLinkButtonProps> = ({ shareURL }) => {
  const [copied, setCopied] = useState(false);
  
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
