import React from 'react';

//Add each value to its respective control
const ValueControl = ({ piece, featureName, controlName }) => {
	const control = piece.features[featureName][controlName.toLowerCase()];

	let icon;
	switch (control.status) {
		case 0:
			icon = <svg className= "green-status-table" xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" /></svg>;
			break;
		case 1:
			icon = <svg className= "yellow-status-table" xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>;
			break;
		case 2:
			icon = <svg className= "red-status-table" xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg>;
			break;
		default:
			icon = null;
	}

	return (
		<div className="row">
			<div className="element">{controlName}</div>
			<div className="value">{control.dev.toFixed(2)}</div>
			<div className="value">{control.devOutTolerance.toFixed(2)}</div>
			<div className={`value ${control.status}`}>
				{icon}
			</div>
		</div>
	);
};

export default ValueControl;
