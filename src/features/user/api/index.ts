import supabase from "@/lib/supabase";
import { UserData } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const { data, error } = await supabase.from("users").select().single();

      if (error) {
        throw new Error(error.message);
      }

      return data as UserData;
    },
  });
};
