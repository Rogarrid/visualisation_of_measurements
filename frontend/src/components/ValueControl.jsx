
const ValueControl = ({ piece, featureName, controlName }) => {
	const control = piece.features[featureName][controlName.toLowerCase()];

	return (
		<div className="row">
			<div className="element">{controlName}</div>
			<div className="cell">{control.dev.toFixed(2)}</div>
			<div className="cell">{control.devOutTolerance.toFixed(2)}</div>
			<div className={`cell ${control.status.toLowerCase()}`}>
				{control.status}
			</div>
		</div>
	);
};

export default ValueControl;
