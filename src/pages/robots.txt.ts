import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
Allow: /

# AI / LLM crawlers — explicit allow
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
