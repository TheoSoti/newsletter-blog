import { useState } from 'react';

const buttonStyle = {
	padding: '0.5em',
	marginBottom: '1.5em',
	fontSize: '1em',
	color: 'var(--text)',
};

export function Base({ children, buttonText, ddStyle, exempleNumber }) {
	const [hidden, setHidden] = useState(true);
	const [height, setHeight] = useState(100);

	const toggleText = () => {
		setHidden(!hidden);
	};

	const onOptionChange = (e) => {
		setHeight(+e.target.value);
	};

	if (exempleNumber === 2) {
		ddStyle = {
			...ddStyle,
			maxHeight: height,
		};
	}

	const Inputs = () => {
		if (exempleNumber !== 2) return;

		return (
			<div className="heightInputs">
				Change value of the <code>max-height</code> property: <br />
				<label>
					<input type="radio" name="maxHeight" value="100" checked={height === 100} onChange={onOptionChange} />
					100px
				</label>
				<label>
					<input type="radio" name="maxHeight" value="400" checked={height === 400} onChange={onOptionChange} />
					400px
				</label>
				<label>
					<input type="radio" name="maxHeight" value="1000" checked={height === 1000} onChange={onOptionChange} />
					1000px
				</label>
			</div>
		);
	};

	return (
		<>
			<Inputs />

			<button style={buttonStyle} className={'button'} type="button" onClick={toggleText}>
				{buttonText}
			</button>

			<div style={ddStyle} className={`dropdown ${hidden ? ' hide' : ''}`}>
				{children}
			</div>
		</>
	);
}
