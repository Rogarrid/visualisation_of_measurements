import React from 'react';
import Header from './Header';
import Controls from './Controls';
import ValueControl from './ValueControl';
import Plus from './Plus';

//Creation of the table where the values that have been calculated are represented.
const Table = ({ featureName, piece }) => {
	let status;

	if (piece.features[featureName].x.status === 2 || piece.features[featureName].y.status === 2 ||
		piece.features[featureName].z.status === 2 || piece.features[featureName].diameter.status === 2) {
		status = 2;
	} else if (piece.features[featureName].x.status === 1 || piece.features[featureName].y.status === 1 ||
		piece.features[featureName].z.status === 1 || piece.features[featureName].diameter.status === 1) {
		status = 1;
	} else {
		status = 0;
	}

	return (
		<div key={featureName} className="feature-card">
			<Header featureName={featureName} status={status} />
			<div className="table-container">
				<Controls />
				<ValueControl featureName={featureName} piece={piece} controlName={"X"} />
				<ValueControl featureName={featureName} piece={piece} controlName={"Y"} />
				<ValueControl featureName={featureName} piece={piece} controlName={"Z"} />
				<ValueControl featureName={featureName} piece={piece} controlName={"Diameter"} />
			</div>
			<Plus />
		</div>
	)
};

export default Table;
