// import { appRouter } from '@/lib/trpc/root';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { APIRoute } from 'astro';

import { appRouter, createContext } from '@/lib/trpc/router';

export const prerender = false;

// The Astro API route, handling all incoming HTTP requests.
export const ALL: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    endpoint: '/api/v1/trpc',
    req: request,
    router: appRouter,
    createContext,
    onError({ error }) {
      if (import.meta.env.DEV && error.code === 'INTERNAL_SERVER_ERROR') {
        throw error;
      }
    },
  });
};
