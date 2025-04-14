
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { registerFormSchema, RegisterFormValues } from "./schemas/registerFormSchema";
import NameField from "./register/NameField";
import EmailField from "./register/EmailField";
import PasswordField from "./register/PasswordField";

interface RegisterFormProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  switchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ isLoading, setIsLoading, switchToLogin }) => {
  // Register form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle register submission
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // This would connect to your actual auth system
      console.log("Register attempt", data);
      
      // Simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Your account has been created. You can now log in.",
      });
      
      // Switch to login tab after successful registration
      switchToLogin();
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "Unable to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <NameField form={form} isLoading={isLoading} />
        <EmailField form={form} isLoading={isLoading} />
        <PasswordField 
          form={form} 
          isLoading={isLoading} 
          name="password" 
          placeholder="Password" 
        />
        <PasswordField 
          form={form} 
          isLoading={isLoading} 
          name="confirmPassword" 
          placeholder="Confirm Password" 
        />

        <Button
          type="submit"
          className="w-full py-5 bg-primary-700 hover:bg-primary-800 text-white rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
