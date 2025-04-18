import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Login form schema
const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional().default(false)
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLoading, setIsLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isEmailNotConfirmed, setIsEmailNotConfirmed] = useState(false);
  const { signIn } = useAuth();

  // Login form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
  });

  // Handle login submission
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);
    setIsEmailNotConfirmed(false);
    
    try {
      await signIn(data.email, data.password);
      
      // Store user preferences if 'Remember me' is checked
      if (data.rememberMe) {
        localStorage.setItem('rememberedEmail', data.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.message?.includes("Email not confirmed")) {
        setIsEmailNotConfirmed(true);
      } else {
        setLoginError(error.message || "An error occurred during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to resend confirmation email
  const handleResendConfirmation = async () => {
    const email = form.getValues("email");
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      
      if (error) throw error;
      
      toast({
        title: "Confirmation email sent",
        description: "Please check your inbox and spam folder",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend confirmation email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check for remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      form.setValue('email', rememberedEmail);
      form.setValue('rememberMe', true);
    }
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {loginError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}
        
        {isEmailNotConfirmed && (
          <Alert variant="destructive" className="bg-amber-50 text-amber-900 border-amber-500">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Email not confirmed</AlertTitle>
            <AlertDescription className="text-amber-700">
              <p>Please check your email and click the confirmation link.</p>
              <Button 
                type="button" 
                variant="outline"
                size="sm"
                className="mt-2 border-amber-500 text-amber-700 hover:bg-amber-100"
                onClick={handleResendConfirmation}
                disabled={isLoading}
              >
                Resend confirmation email
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <FormControl>
                  <Input
                    placeholder="Enter your username/email"
                    {...field}
                    className="pl-10 pr-4 py-3 rounded-md border border-gray-300"
                    disabled={isLoading}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    className="pl-10 pr-10 py-3 rounded-md border border-gray-300"
                    disabled={isLoading}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <span className="text-sm text-gray-600">Remember me</span>
                </FormItem>
              )}
            />
          </div>
          <a href="#" className="text-sm text-gray-600 hover:text-primary-700">
            Forgot Password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full py-5 bg-primary-700 hover:bg-primary-800 text-white rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
