import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_NAME, SITE_DESCRIPTION } from '../consts';
import { getShortSlug } from '../utils/shortSlug';

// Strip MDX-specific syntax that won't make sense as plain markdown:
// - import statements
// - JSX-like component tags (<Foo />, <Foo>...</Foo>)
// We keep code fences, prose, headings, and standard markdown intact.
const stripMdx = (body: string): string => {
	return body
		// Remove ESM imports at the top of MDX files.
		.replace(/^\s*import\s+[^;\n]+from\s+['"][^'"]+['"];?\s*$/gm, '')
		// Remove self-closing JSX tags like <Foo bar="x" />.
		.replace(/<([A-Z][A-Za-z0-9]*)([^>]*?)\/>/g, '')
		// Remove paired JSX tags like <Foo>...</Foo> (non-greedy, multi-line).
		.replace(/<([A-Z][A-Za-z0-9]*)([^>]*)>([\s\S]*?)<\/\1>/g, '$3')
		// Collapse 3+ blank lines.
		.replace(/\n{3,}/g, '\n\n')
		.trim();
};

export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		return new Response('Site not configured', { status: 500 });
	}

	const baseUrl = site.toString().replace(/\/$/, '');

	const blogPosts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);
	const shortPosts = (await getCollection('short')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);

	const renderPost = (
		title: string,
		description: string,
		url: string,
		pubDate: Date,
		updatedDate: Date | undefined,
		body: string
	) => {
		const dateLine = updatedDate
			? `Published: ${pubDate.toISOString().slice(0, 10)} | Updated: ${updatedDate.toISOString().slice(0, 10)}`
			: `Published: ${pubDate.toISOString().slice(0, 10)}`;
		return `# ${title}

URL: ${url}
${dateLine}

> ${description}

${stripMdx(body)}
`;
	};

	const blogSection = blogPosts
		.map((post) =>
			renderPost(
				post.data.title,
				post.data.description,
				`${baseUrl}/blog/${post.slug}/`,
				post.data.pubDate,
				post.data.updatedDate,
				post.body
			)
		)
		.join('\n---\n\n');

	const shortSection = shortPosts
		.map((post) =>
			renderPost(
				post.data.title,
				post.data.description,
				`${baseUrl}/short/${getShortSlug(post.slug)}/`,
				post.data.pubDate,
				post.data.updatedDate,
				post.body
			)
		)
		.join('\n---\n\n');

	const body = `# ${SITE_NAME} — Full Content

${SITE_DESCRIPTION}

Author: Theo Soti — Frontend Developer & Content Creator.
Site: ${baseUrl}

================================================================
BLOG POSTS
================================================================

${blogSection}

================================================================
SHORT POSTS
================================================================

${shortSection}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'X-Robots-Tag': 'noindex, follow',
		},
	});
};
