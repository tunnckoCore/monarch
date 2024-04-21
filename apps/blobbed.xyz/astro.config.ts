import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import checker from 'vite-plugin-checker';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react(), tailwind()],
  prefetch: {
    defaultStrategy: 'viewport',
  },
  // vite: {
  //   plugins: [
  //     checker({
  //       typescript: true,
  //       overlay: {
  //         initialIsOpen: false,
  //         badgeStyle: 'left: 55px; bottom: 8px;',
  //       },
  //       enableBuild: false, // we already check that in `yarn ci:check`
  //     }),
  //   ],
  //   // optimizeDeps: {
  //   //   exclude: ['@resvg/resvg-js'],
  //   // },
  //   // build: {
  //   //   sourcemap: true /* B2B:CONFIG consider disabling sourcemaps for production */,
  //   // },
  // },
});
