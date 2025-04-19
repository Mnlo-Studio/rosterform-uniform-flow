
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { usePublicForm } from '@/hooks/usePublicForm';
import { toast } from 'sonner';
import { CheckCircle, Copy, Link2, Plus } from 'lucide-react';
import { useState as useHookState } from 'react';

interface OrdersHeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  statusFilter: string;
  onStatusFilter: (status: string) => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  searchQuery,
  onSearch,
  statusFilter,
  onStatusFilter
}) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [showFormGenerator, setShowFormGenerator] = useState(false);
  const [copied, setCopied] = useHookState(false);
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
    <div className="bg-white border-b border-gray-100 py-4 md:py-6 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Orders</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-64 md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders or team names"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={onStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
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
              
              <Button asComponent={Link} to="/order-form" className="whitespace-nowrap">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">New Order</span>
                <span className="sm:hidden">New</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;
