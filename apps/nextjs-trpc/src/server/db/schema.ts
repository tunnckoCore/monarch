// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm';
import { index, int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `nextjs-app-router-browser-extension_${name}`,
);

export const PostTable = createTable(
  'post',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name', { length: 256 }),
    createdAt: int('created_at').default(Date.now()).notNull(),
    updatedAt: int('updated_at').default(Date.now()),
  },
  (example) => ({
    nameIndex: index('name_idx').on(example.name),
  }),
);

export const PostSchema = createSelectSchema(PostTable);
export const PostInsertSchema = createInsertSchema(PostTable);

export type PostSelectType = z.infer<typeof PostSchema>;
export type PostInsertType = z.infer<typeof PostInsertSchema>;
