import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Building, Lock, User, Settings, PhoneCall, Mail, Calendar, Users, CreditCard, ZapIcon } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

// Profile form schema
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  timezone: z.string().optional(),
});

// Password form schema
const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Zapier integration form schema
const zapierFormSchema = z.object({
  webhookUrl: z.string().url({
    message: "Please enter a valid webhook URL.",
  }),
  triggerType: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;
type ZapierFormValues = z.infer<typeof zapierFormSchema>;

const Account: React.FC = () => {
  const { toast } = useToast();
  const [isZapierConnected, setIsZapierConnected] = useState(false);
  const [isTestingZapier, setIsTestingZapier] = useState(false);

  // Profile form setup
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      company: "Johnson Designs",
      role: "Marketing",
      timezone: "America/New_York",
    },
  });

  // Password form setup
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Zapier form setup
  const zapierForm = useForm<ZapierFormValues>({
    resolver: zodResolver(zapierFormSchema),
    defaultValues: {
      webhookUrl: "",
      triggerType: "order_update",
    },
  });

  // Form submission handlers
  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log("Profile data:", data);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const onPasswordSubmit = (data: PasswordFormValues) => {
    console.log("Password data:", data);
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    passwordForm.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const onZapierSubmit = (data: ZapierFormValues) => {
    console.log("Zapier integration data:", data);
    setIsZapierConnected(true);
    toast({
      title: "Zapier Integration Saved",
      description: "Your Zapier webhook has been configured successfully.",
    });
  };

  const handleTestZapier = () => {
    const webhookUrl = zapierForm.getValues("webhookUrl");
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsTestingZapier(true);
    console.log("Testing Zapier webhook:", webhookUrl);

    // Simulate API call to test Zapier webhook
    setTimeout(() => {
      setIsTestingZapier(false);
      toast({
        title: "Test Successful",
        description: "Zapier webhook test was successful.",
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-2">Account Settings</h1>
      <p className="text-muted-foreground mb-6">Manage your account settings and preferences.</p>
      
      <Tabs defaultValue="profile" className="mb-6">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <ZapIcon className="h-4 w-4" />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Company</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary-700" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role / Department</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timezone</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                              <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                              <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                              <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                              <SelectItem value="Europe/London">London (GMT)</SelectItem>
                              <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                              <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="bg-primary-700 hover:bg-primary-800">
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary-700" />
                Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="hidden md:block"></div>
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="bg-primary-700 hover:bg-primary-800">
                    Update Password
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ZapIcon className="h-5 w-5 text-primary-700" />
                Zapier Integration Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-medium">Status:</span>
                {isZapierConnected ? (
                  <div className="flex items-center gap-1 text-success-500">
                    <CheckCircle className="h-5 w-5" />
                    <span>Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-gray-500">
                    <XCircle className="h-5 w-5" />
                    <span>Not Connected</span>
                  </div>
                )}
              </div>
              
              <Form {...zapierForm}>
                <form onSubmit={zapierForm.handleSubmit(onZapierSubmit)} className="space-y-4">
                  <FormField
                    control={zapierForm.control}
                    name="webhookUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zapier Webhook URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://hooks.zapier.com/hooks/catch/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={zapierForm.control}
                    name="triggerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trigger Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select trigger type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="order_update">On Order Update</SelectItem>
                            <SelectItem value="payment">On Payment</SelectItem>
                            <SelectItem value="new_account">On New Account</SelectItem>
                            <SelectItem value="roster_update">On Roster Update</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleTestZapier}
                      disabled={isTestingZapier}
                    >
                      {isTestingZapier ? "Testing..." : "Test Integration"}
                    </Button>
                    <Button type="submit" className="bg-primary-700 hover:bg-primary-800">
                      Save Integration
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Company Tab */}
        <TabsContent value="company">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary-700" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-sm text-gray-500">
                      <Building className="h-4 w-4" />
                      <span>Company Name</span>
                    </div>
                    <p className="text-lg font-medium">Johnson Designs</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      <span>Billing Email</span>
                    </div>
                    <p className="text-lg font-medium">billing@johnsondesigns.com</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>Team Size</span>
                    </div>
                    <p className="text-lg font-medium">12 Members</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-sm text-gray-500">
                      <Settings className="h-4 w-4" />
                      <span>Subscription Plan</span>
                    </div>
                    <p className="text-lg font-medium">Business Pro</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>Renewal Date</span>
                    </div>
                    <p className="text-lg font-medium">July 15, 2025</p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex justify-end">
                  <Button className="bg-primary-700 hover:bg-primary-800 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Manage Billing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8">
        <LogoutButton 
          variant="destructive"
          className="w-auto px-8"
        />
      </div>
    </div>
  );
};

export default Account;
