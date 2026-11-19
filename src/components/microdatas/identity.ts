import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import { SITE_DESCRIPTION, SITE_NAME } from '../../consts';

const site = import.meta.env.SITE.replace(/\/$/, '');

export const homeUrl = `${site}/`;

// Same profiles as the footer, so the schema matches what visitors can see.
const sameAs = [
	'https://www.linkedin.com/in/theosoti/',
	'https://x.com/theoleff',
	'https://www.youtube.com/@TheoSoti',
	'https://github.com/TheoSoti',
	'https://codepen.io/theosoti',
];

export const person = {
	'@type': 'Person',
	'@id': `${homeUrl}#person`,
	name: 'Theo Soti',
	url: homeUrl,
	description: 'Frontend Developer & Content Creator',
	image: `${site}${profile.src}`,
	sameAs,
};

export const organization = {
	'@type': 'Organization',
	'@id': `${homeUrl}#organization`,
	name: 'Theo Soti',
	alternateName: SITE_NAME,
	url: homeUrl,
	description: SITE_DESCRIPTION,
	logo: {
		'@type': 'ImageObject',
		url: `${site}${logo.src}`,
		width: logo.width,
		height: logo.height,
	},
	image: `${site}${profile.src}`,
	founder: { '@id': person['@id'] },
	sameAs,
};
