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
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        // Hide raw markdown alternates and llms.txt indexes from the sitemap.
        if (
          item.url.endsWith('.md') ||
          item.url.endsWith('/llms.txt') ||
          item.url.endsWith('/llms-full.txt')
        ) {
          return undefined;
        }
        if (item.url === 'https://theosoti.com/') {
          return { ...item, priority: 1.0 };
        }
        if (item.url === 'https://theosoti.com/you-dont-need-js/') {
          return { ...item, priority: 1.0 };
        }
        if (item.url.includes('/blog/') && item.url !== 'https://theosoti.com/blog/') {
          return { ...item, priority: 0.9 };
        }
        if (item.url.includes('/short/') && item.url !== 'https://theosoti.com/short/') {
          return { ...item, priority: 0.6 };
        }
        return item;
      },
    }),
    react({
      include: ['**/react/*'],
    }),
  ],
});
