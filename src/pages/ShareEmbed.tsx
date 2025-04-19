
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import EmbedCodeBlock from "@/components/embed/EmbedCodeBlock";
import TipsAndTroubleshooting from "@/components/embed/TipsAndTroubleshooting";
import PageHeader from "@/components/embed/PageHeader";

const ShareEmbed = () => {
  const { user } = useAuth();
  const userId = user?.id || '';
  
  const formId = `roster-form-${userId}`;
  const embedDomain = "embed.rosterform.com";
  const shareDomain = "www.rosterform.com";
  
  const inlineCode = `<div data-form-id="${formId}"></div>
<script>(function() {
  var script = document.createElement("script");
  script.src = "https://${embedDomain}/embed.min.js";
  document.body.appendChild(script);
})();</script>`;

  const fullScreenCode = `<iframe src="https://${embedDomain}/fullscreen/${formId}" width="100%" height="100%" style="border:none;"></iframe>`;

  const popupCode = `<script src="https://${embedDomain}/embed.min.js"></script>`;
  const popupUsageCode = `<button data-form-id="${formId}" data-popup-button="true">Open Roster Form</button>`;
  const popupManualCode = `RosterForm.popup('${formId}');`;
  
  const shareURL = `https://${shareDomain}/order/${formId}`;

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader shareURL={shareURL} />
      
      <Card className="mt-6">
        <CardContent className="pt-6">
          <Tabs defaultValue="inline" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="inline">Inline Embed</TabsTrigger>
              <TabsTrigger value="fullscreen">Full Screen</TabsTrigger>
              <TabsTrigger value="popup">Popup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inline" className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                Use an inline embed to add the roster form directly into your existing page.
              </div>
              <EmbedCodeBlock code={inlineCode} />
            </TabsContent>
            
            <TabsContent value="fullscreen" className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                Use a full screen iframe to embed the complete roster form experience.
              </div>
              <EmbedCodeBlock code={fullScreenCode} />
            </TabsContent>
            
            <TabsContent value="popup" className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                Add this script to your page once:
              </div>
              <EmbedCodeBlock code={popupCode} />
              
              <div className="text-sm text-muted-foreground mt-6 mb-2">
                Then, add this to any button or element to trigger the popup:
              </div>
              <EmbedCodeBlock code={popupUsageCode} />
              
              <div className="text-sm text-muted-foreground mt-6 mb-2">
                Or trigger the popup programmatically:
              </div>
              <EmbedCodeBlock code={popupManualCode} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardContent className="pt-6">
          <TipsAndTroubleshooting />
        </CardContent>
      </Card>
      
      <div className="flex justify-end mt-6">
        <Button variant="outline" className="text-sm">
          View Documentation
        </Button>
      </div>
    </div>
  );
};

export default ShareEmbed;
