// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Preview lives at zuhayr.io/hut (proxied from the main site).
// When the restaurant gets its own domain: set BASE_PATH=/ and SITE_URL on Vercel.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://www.zuhayr.io',
  base: process.env.BASE_PATH ?? '/hut',
  vite: {
    plugins: [tailwindcss()],
  },
});
