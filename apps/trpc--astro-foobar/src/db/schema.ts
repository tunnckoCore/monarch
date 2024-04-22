import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const UserTable = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  username: text('username').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const UserSchema = createSelectSchema(UserTable);
export const UserInsertSchema = createInsertSchema(UserTable);

export type UserSelectType = z.infer<typeof UserSchema>;
export type UserInsertType = z.infer<typeof UserInsertSchema>;

// TODO(tomorrow): setup trpc, wagmi + viem + privy
