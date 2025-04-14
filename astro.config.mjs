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
			customPages: ['https://theosoti.com'],
			serialize(item) {
				// Si c'est la page d'accueil, on s'assure qu'elle n'a pas de slash final
				if (item.url === 'https://theosoti.com/') {
					return {
						...item,
						url: 'https://theosoti.com',
					};
				}
				// Pour les autres pages, on conserve l'URL telle quelle
				return item;
			},
		}),
		partytown(),
		react({
			include: ['**/react/*'],
		}),
	],
});
