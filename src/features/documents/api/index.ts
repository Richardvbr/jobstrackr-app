import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export function useDocumentsQuery() {
  return useQuery({
    queryKey: ["get-documents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select()
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
}

export function useDocumentQuery(documentId: string) {
  return useQuery({
    queryKey: [`get-document-${documentId}`],
    queryFn: async () => {
      const { data, error } = await supabase.from("documents").select().eq("id", documentId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
}
