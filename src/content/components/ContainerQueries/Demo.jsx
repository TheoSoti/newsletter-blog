import { useState } from 'react';
import Card from './Card.jsx';

const containerStyle = {
	padding: '1em',
	maxWidth: '100%',
	backgroundColor: 'white',
	overflow: 'auto',
	display: 'flex',
	justifyContent: 'space-between',
	gap: '0.5em',
};

const buttonsStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '1em',
	paddingTop: '1em',
	backgroundColor: 'var(--white)',
};

export default function Demo() {
	let [card, setCard] = useState(1);

	function addCard() {
		if (card < 3) {
			setCard((prev) => prev + 1);
		}
	}

	function removeCard() {
		if (card > 1) {
			setCard((prev) => prev - 1);
		}
	}

	return (
		<>
			<div style={buttonsStyle}>
				<button onClick={addCard} disabled={card === 3 ? true : false}>
					Add Card
				</button>
				<button onClick={removeCard} disabled={card === 1 ? true : false}>
					Remove Card
				</button>
			</div>
			<main style={containerStyle}>
				{[...Array(card)].map((_, index) => (
					<Card key={index} />
				))}
			</main>
		</>
	);
}
