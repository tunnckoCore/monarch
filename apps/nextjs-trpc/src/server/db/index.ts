import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import { env } from '@/env.js';
import * as schema from './schema.ts';

const turso = createClient({
  url: env.DATABASE_URL!,
  authToken: env.TURSO_AUTH_TOKEN,
});

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
// const globalForDb = globalThis as unknown as {
//   conn: Database.Database | undefined;
// };

// export const conn =
//   globalForDb.conn ?? new Database(env.DATABASE_URL, { fileMustExist: false });
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(turso, { schema });
