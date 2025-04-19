
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GenerateFormParams {
  teamName: string;
  email?: string;
}

interface FormData {
  id: string;
  slug: string;
  team_name: string;
  email: string | null;
  form_title: string | null;
  created_at: string;
}

export function usePublicForm() {
  // Generate a new public form link
  const generateFormLink = useMutation({
    mutationFn: async ({ teamName, email }: GenerateFormParams) => {
      const { data, error } = await supabase.functions.invoke("generate-slug", {
        body: { teamName, email },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onError: (error) => {
      toast.error(`Failed to generate form: ${error.message}`);
    },
  });

  // Get a form by slug
  const getFormBySlug = (slug?: string) => {
    return useQuery({
      queryKey: ["public-form", slug],
      queryFn: async () => {
        if (!slug) return null;
        
        const { data, error } = await supabase
          .from("public_forms")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error) {
          throw new Error(error.message);
        }

        return data as FormData | null;
      },
      enabled: !!slug,
    });
  };

  // Get all forms for the current user
  const getUserForms = () => {
    return useQuery({
      queryKey: ["user-forms"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("public_forms")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        return data as FormData[];
      },
    });
  };

  return {
    generateFormLink,
    getFormBySlug,
    getUserForms,
  };
}
