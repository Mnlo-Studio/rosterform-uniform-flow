
import React, { useState } from 'react';
import { Link2, CheckCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { usePublicForm } from '@/hooks/usePublicForm';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FormGeneratorProps {
  showFormGenerator: boolean;
  setShowFormGenerator: (show: boolean) => void;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  showFormGenerator,
  setShowFormGenerator
}) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  
  const { generateFormLink } = usePublicForm();

  const handleGenerateLink = async () => {
    if (!formName.trim()) {
      toast.error('Please enter a team name');
      return;
    }

    try {
      const result = await generateFormLink.mutateAsync({
        teamName: formName,
        email: formEmail || undefined
      });

      if (result.success) {
        const url = `${window.location.origin}/form/${result.slug}`;
        setGeneratedLink(url);
        toast.success('Form link generated successfully');
      }
    } catch (error) {
      console.error('Error generating form:', error);
    }
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          toast.success('Link copied to clipboard!');
        })
        .catch(() => {
          toast.error('Failed to copy link');
        });
    }
  };

  return (
    <Popover open={showFormGenerator} onOpenChange={setShowFormGenerator}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="whitespace-nowrap">
          <Link2 className="h-4 w-4 mr-2" />
          Create Form Link
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4 p-1">
          <div className="space-y-2">
            <h4 className="font-medium">Generate Public Form Link</h4>
            <p className="text-sm text-muted-foreground">
              Create a shareable link for a specific team.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="teamName">Team Name*</Label>
              <Input 
                id="teamName"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Enter team name"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="email">Email (optional)</Label>
              <Input 
                id="email" 
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="team@example.com"
              />
            </div>
          </div>
          
          {generatedLink && (
            <div className="space-y-2">
              <Label htmlFor="link">Form Link</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="link"
                  value={generatedLink}
                  readOnly
                  className="pr-8 text-xs"
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 absolute right-6"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
          
          <Button onClick={handleGenerateLink} className="w-full" disabled={generateFormLink.isPending}>
            {generateFormLink.isPending ? "Generating..." : "Generate Link"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FormGenerator;
