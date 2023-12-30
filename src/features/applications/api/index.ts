import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export function getApplicationsQuery() {
  return useQuery({
    queryKey: ["get-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select()
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
}

export function getApplicationQuery(applicationId: string) {
  return useQuery({
    queryKey: [`get-application-${applicationId}`],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select()
        .eq("id", applicationId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
}
