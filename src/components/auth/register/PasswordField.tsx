
import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormValues } from "../schemas/registerFormSchema";

interface PasswordFieldProps {
  form: UseFormReturn<RegisterFormValues>;
  isLoading: boolean;
  name: "password" | "confirmPassword";
  placeholder: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ form, isLoading, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
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
  );
};

export default PasswordField;
