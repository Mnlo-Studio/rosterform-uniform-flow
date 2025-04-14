
import React from "react";
import { Mail } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormValues } from "../schemas/registerFormSchema";

interface EmailFieldProps {
  form: UseFormReturn<RegisterFormValues>;
  isLoading: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({ form, isLoading }) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <FormControl>
              <Input
                placeholder="Your e-mail address"
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
  );
};

export default EmailField;
