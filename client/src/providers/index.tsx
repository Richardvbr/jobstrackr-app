import { useTrpc } from "@/hooks/useTrpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

import { trpc } from "@/lib/trpc";
import supabase from "@/lib/supabase";
import { SessionContextProvider } from "@/contexts/AuthContext";
import { AppContextProvider } from "@/contexts/AppContext";

export const Providers = ({ children }: PropsWithChildren) => {
  const { trpcQueryClient, trpcClient } = useTrpc();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <AppContextProvider>
        <trpc.Provider client={trpcClient} queryClient={trpcQueryClient}>
          <QueryClientProvider client={trpcQueryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      </AppContextProvider>
    </SessionContextProvider>
  );
};
