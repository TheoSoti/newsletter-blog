import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getShortSlug } from '../../utils/shortSlug';

export async function GET(context) {
	const posts = (await getCollection('short')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: 'CSS Short Articles by Theo Soti',
		description: 'Short CSS and frontend tips by Theo Soti.',
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/short/${getShortSlug(post.slug)}/`,
		})),
	});
}
