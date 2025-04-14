
import React from "react";
import { User } from "lucide-react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormValues } from "../schemas/registerFormSchema";

interface NameFieldProps {
  form: UseFormReturn<RegisterFormValues>;
  isLoading: boolean;
}

const NameField: React.FC<NameFieldProps> = ({ form, isLoading }) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <FormControl>
              <Input
                placeholder="Full Name"
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

export default NameField;
