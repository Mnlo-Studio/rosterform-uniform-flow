
import React, { useState } from 'react';
import { usePublicForm } from '@/hooks/usePublicForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const PublicFormList: React.FC = () => {
  const { getUserForms } = usePublicForm();
  const { data: forms, isLoading, error } = getUserForms();
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});
  
  const handleCopyLink = (formId: string, slug: string) => {
    const url = `${window.location.origin}/form/${slug}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopiedLinks(prev => ({
          ...prev,
          [formId]: true
        }));
        toast.success('Form link copied to clipboard');
        setTimeout(() => {
          setCopiedLinks(prev => ({
            ...prev,
            [formId]: false
          }));
        }, 2000);
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  const goToForm = (slug: string) => {
    window.open(`/form/${slug}`, '_blank');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Public Form Links</CardTitle>
          <CardDescription>Loading your form links...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Public Form Links</CardTitle>
          <CardDescription className="text-red-500">
            Error loading your form links
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!forms || forms.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Public Form Links</CardTitle>
          <CardDescription>
            You haven't created any public forms yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Create a public form link from the Orders page to share with your team.
          </p>
          <Button asChild className="w-full sm:w-auto">
            <a href="/orders">Go to Orders</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Public Form Links</CardTitle>
        <CardDescription>
          Share these links with your team members to collect their orders.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {forms.map((form) => (
            <div key={form.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{form.team_name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Created {formatDistanceToNow(new Date(form.created_at), { addSuffix: true })}
                </p>
              </div>
              <div className="flex flex-row gap-2 self-end sm:self-auto">
                <div className="relative flex-1 sm:w-60">
                  <Input
                    value={`${window.location.origin}/form/${form.slug}`}
                    readOnly
                    className="pr-9 text-xs"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => handleCopyLink(form.id, form.slug)}
                  >
                    {copiedLinks[form.id] ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => goToForm(form.slug)}
                  title="Open form"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicFormList;
