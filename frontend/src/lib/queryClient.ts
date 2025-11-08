import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: how long until a query is considered stale (5 minutes)
      staleTime: 5 * 60 * 1000,

      // Cache time: how long unused data stays in cache (10 minutes)
      gcTime: 10 * 60 * 1000,

      // Retry failed requests 3 times before giving up
      retry: 3,

      // Retry delay (exponential backoff)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Don't refetch on window focus in development
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',

      // Don't refetch on mount if data is still fresh
      refetchOnMount: false,

      // Refetch on network reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry mutations only once
      retry: 1,
    },
  },
});
