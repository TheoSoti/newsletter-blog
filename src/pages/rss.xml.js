import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getShortSlug } from '../utils/shortSlug';

export async function GET(context) {
	const blogPosts = await getCollection('blog');
	const shortPosts = await getCollection('short');
	const items = [
		...blogPosts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
		...shortPosts.map((post) => ({
			...post.data,
			link: `/short/${getShortSlug(post.slug)}/`,
		})),
	].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
