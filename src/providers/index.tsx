import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

import supabase from "@/lib/supabase";
import { SessionContextProvider } from "@/contexts/AuthContext";
import { AppContextProvider } from "@/contexts/AppContext";

export const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AppContextProvider>
    </SessionContextProvider>
  );
};
