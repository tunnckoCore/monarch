import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc.ts';
import { PostInsertSchema, PostTable } from '@/server/db/schema.ts';

export const postRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  create: publicProcedure.input(PostInsertSchema).mutation(async ({ ctx, input }) => {
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await ctx.db.insert(PostTable).values({
      name: input.name,
    });
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.PostTable.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.PostTable.findMany({
      orderBy(fields, operators) {
        return [operators.desc(fields.createdAt)];
      },
    });
  }),
});
