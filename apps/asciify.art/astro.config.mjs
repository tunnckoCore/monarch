import tailwind from '@astrojs/tailwind';
// import react from "@astrojs/react";

import vercel from '@astrojs/vercel/serverless';
import tunnel from 'astro-tunnel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(), tunnel()],
});
