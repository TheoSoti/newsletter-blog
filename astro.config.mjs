// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://theosoti.com',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => page !== 'https://theosoti.com/newsletter-success/',
		}),
		partytown(),
		react({
			include: ['**/react/*'],
		}),
	],
});
