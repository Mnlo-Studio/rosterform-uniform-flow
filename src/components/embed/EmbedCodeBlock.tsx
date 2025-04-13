
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface EmbedCodeBlockProps {
  code: string;
}

const EmbedCodeBlock: React.FC<EmbedCodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-[#1A1F2C] text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2 bg-background gap-1"
        onClick={copyToClipboard}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy
          </>
        )}
      </Button>
    </div>
  );
};

export default EmbedCodeBlock;
