import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { getShortSlug } from '../../utils/shortSlug';

const stripMdx = (body: string): string => {
	return body
		.replace(/^\s*import\s+[^;\n]+from\s+['"][^'"]+['"];?\s*$/gm, '')
		.replace(/<([A-Z][A-Za-z0-9]*)([^>]*?)\/>/g, '')
		.replace(/<([A-Z][A-Za-z0-9]*)([^>]*)>([\s\S]*?)<\/\1>/g, '$3')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
};

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection('short');
	return posts.map((post) => ({
		params: { slug: getShortSlug(post.slug) },
		props: { post },
	}));
};

type Props = { post: CollectionEntry<'short'> };

export const GET: APIRoute = ({ props, site }) => {
	const { post } = props as Props;
	const { title, description, pubDate, updatedDate, tags } = post.data;
	const baseUrl = site ? site.toString().replace(/\/$/, '') : '';
	const canonical = `${baseUrl}/short/${getShortSlug(post.slug)}/`;
	const tagsLine = tags.length > 0 ? `Tags: ${tags.join(', ')}\n` : '';

	const dateLine = updatedDate
		? `Published: ${pubDate.toISOString().slice(0, 10)} | Updated: ${updatedDate.toISOString().slice(0, 10)}`
		: `Published: ${pubDate.toISOString().slice(0, 10)}`;

	const md = `# ${title}

URL: ${canonical}
${dateLine}
Author: Theo Soti
${tagsLine}

> ${description}

${stripMdx(post.body)}
`;

	return new Response(md, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'X-Robots-Tag': 'noindex, follow',
		},
	});
};
