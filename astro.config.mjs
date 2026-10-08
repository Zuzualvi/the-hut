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
  // Put the CSS straight into each page instead of separate files, so the browser can draw
  // the page without waiting on extra downloads. It's small (about 10 KB compressed).
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()],
  },
});
