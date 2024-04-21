import type { inferAsyncReturnType } from '@trpc/server';
import { createCallerFactory, initTRPC, TRPCError } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { z } from 'zod';

export function createContext({ req }: FetchCreateContextFnOptions) {
  return { req };
}

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export const appRouter = t.router({
  hello: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return {
        username: input.username,
      };
    }),
});

export type AppRouter = typeof appRouter;

// const createRouterCaller = createCallerFactory();
// export const createCaller = createRouterCaller(appRouter);
