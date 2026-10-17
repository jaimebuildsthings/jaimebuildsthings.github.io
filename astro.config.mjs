// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jaimebuildsthings.dev',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      // Dual themes: colors are emitted as CSS variables and picked in global.css
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
