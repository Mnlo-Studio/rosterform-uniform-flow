
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface EmbedCodeBlockProps {
  code: string;
}

const EmbedCodeBlock: React.FC<EmbedCodeBlockProps> = ({ code }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="relative">
      <pre className="bg-[#1A1F2C] text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2 bg-background"
        onClick={copyToClipboard}
      >
        <Copy className="h-4 w-4 mr-1" />
        Copy
      </Button>
    </div>
  );
};

export default EmbedCodeBlock;
