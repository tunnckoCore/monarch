import type { Config } from 'drizzle-kit';

import { serverEnv } from './src/t3-env.ts';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'turso',
  dbCredentials: {
    url: serverEnv.TURSO_DATABASE_URL,
    authToken: serverEnv.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
