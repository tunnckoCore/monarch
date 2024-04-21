import { type Config } from 'drizzle-kit';

import { env } from '@/env.js';

export default {
  out: './src/server/db/migrations',
  schema: './src/server/db/schema.ts',
  driver: 'turso',
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  tablesFilter: ['nextjs-app-router-browser-extension_*'],
} satisfies Config;
