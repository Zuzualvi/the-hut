// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://thehutglassboro.com',
  integrations: [
    // The share card page only exists to screenshot the link-preview image.
    sitemap({ filter: (page) => !page.includes('/share-card') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
