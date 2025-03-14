import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import { SessionContextProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';
import { toastOptions } from '@/utils/toast';

export const ContextProviders = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Always fresh data, clear cache after 5 mins
        staleTime: 0,
        cacheTime: 300000,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ThemeProvider defaultTheme='system'>
      <SessionContextProvider supabaseClient={supabase}>
        <QueryClientProvider client={queryClient}>
          <Toaster position='bottom-center' toastOptions={toastOptions} />
          {children}
        </QueryClientProvider>
      </SessionContextProvider>
    </ThemeProvider>
  );
};
