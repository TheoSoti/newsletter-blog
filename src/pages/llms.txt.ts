import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_NAME, SITE_DESCRIPTION } from '../consts';
import { getShortSlug } from '../utils/shortSlug';

export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		return new Response('Site not configured', { status: 500 });
	}

	const blogPosts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);
	const shortPosts = (await getCollection('short')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);

	const baseUrl = site.toString().replace(/\/$/, '');

	const blogList = blogPosts
		.map(
			(post) =>
				`- [${post.data.title}](${baseUrl}/blog/${post.slug}/): ${post.data.description}`
		)
		.join('\n');

	const shortList = shortPosts
		.map(
			(post) =>
				`- [${post.data.title}](${baseUrl}/short/${getShortSlug(post.slug)}/): ${post.data.description}`
		)
		.join('\n');

	const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Author: Theo Soti — Frontend Developer & Content Creator.
Topics: CSS, HTML, JavaScript, modern web development, UI design, frontend tutorials.

## Blog Posts

In-depth tutorials and guides (5+ min reads).

${blogList}

## Short Posts

Bite-sized tips (under 1 min).

${shortList}

## Other

- [About / Author](${baseUrl}/)
- [Newsletter](${baseUrl}/)
- [RSS Feed](${baseUrl}/rss.xml)
- [Sitemap](${baseUrl}/sitemap-index.xml)
- [Full content (markdown)](${baseUrl}/llms-full.txt)
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
