import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
Allow: /

# Search-engine bots: prevent indexing of LLM-only artefacts
# (raw markdown duplicates of HTML posts + llms.txt corpus files).
User-agent: Googlebot
Disallow: /*.md$
Disallow: /llms.txt
Disallow: /llms-full.txt

User-agent: Googlebot-Image
Disallow: /*.md$

User-agent: Bingbot
Disallow: /*.md$
Disallow: /llms.txt
Disallow: /llms-full.txt

User-agent: DuckDuckBot
Disallow: /*.md$
Disallow: /llms.txt
Disallow: /llms-full.txt

User-agent: Slurp
Disallow: /*.md$
Disallow: /llms.txt
Disallow: /llms-full.txt

User-agent: YandexBot
Disallow: /*.md$
Disallow: /llms.txt
Disallow: /llms-full.txt

# AI / LLM crawlers — explicit allow (everything, including .md + llms.* files)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Bytespider
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: YouBot
Allow: /

User-agent: MistralAI-User
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
	if (!site) {
		return new Response('Site not configured', { status: 500 });
	}
	const sitemapURL = new URL('sitemap-index.xml', site);
	return new Response(getRobotsTxt(sitemapURL), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
