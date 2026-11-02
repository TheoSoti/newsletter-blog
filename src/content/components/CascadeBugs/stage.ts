// Decoration shared by every demo. It never sets a property the demos compare.
export const stageBase = `
:host {
	display: block;
	padding: 1rem;
	background: var(--background);
	color: var(--text);
	font-size: 0.95rem;
	line-height: 1.5;
}

* {
	box-sizing: border-box;
}

p {
	margin: 0;
}

a {
	cursor: default;
}

.card {
	display: grid;
	gap: 0.65rem;
	justify-items: start;
	padding: 1rem;
	border: 2px solid var(--border);
	border-radius: 0.5rem;
	background: var(--bg-light);
}

.alert {
	display: grid;
	gap: 0.65rem;
	justify-items: start;
	padding: 1rem;
	border: 2px solid var(--amber);
	border-radius: 0.5rem;
	background: color-mix(in srgb, var(--amber) 12%, var(--bg-light));
}

.card-title {
	font-size: 1.1em;
	font-weight: 700;
}

.button {
	display: inline-block;
	padding: 0.5em 1em;
	border-radius: 0.4rem;
	font-size: 1.2em;
	font-weight: 700;
}
`;
