import { getContentSlug } from './contentSlug';

export const getShortSlug = (slug: string): string => {
	const normalizedSlug = getContentSlug(slug);
	const parts = normalizedSlug.split('/');
	return parts[parts.length - 1] || normalizedSlug;
};
