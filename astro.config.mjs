// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://theosoti.com',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        return (
          page !== 'https://theosoti.com/newsletter-success/' && page !== 'https://theosoti.com/you-dont-need-js-v0/'
        );
      },
    }),
    react({
      include: ['**/react/*'],
    }),
  ],
});
