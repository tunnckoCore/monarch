import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

// import {
//   sqliteTable,
//   type SQLiteColumnBuilderBase,
//   type SQLiteTable,
// } from 'drizzle-orm/sqlite-core';

import { serverEnv } from '../t3-env.ts';

const turso = createClient({
  url: serverEnv.TURSO_DATABASE_URL!,
  authToken: serverEnv.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso);

// type Tables = { [x: string]: Record<string, SQLiteColumnBuilderBase> };

// export const defineTables = (tables: Tables) => {
//   const result = {};

//   Object.entries(tables).forEach(([name, table]) => {
//     result[name] = sqliteTable(name, table);
//   });

//   return result;
// };
