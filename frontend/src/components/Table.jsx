import React from 'react';
import Header from './Header';
import ValueControl from './ValueControl';

const Table = ({ featureName, piece }) => {
	return (
		<div key={featureName} className="feature-card">
			<h3 className="feature-name">{featureName}</h3>
			<div className="table-container">
				<Header />
				<ValueControl featureName={featureName} piece={piece} controlName={"X"} />
				<ValueControl featureName={featureName} piece={piece} controlName={"Y"} />
				<ValueControl featureName={featureName} piece={piece} controlName={"Z"} />
				<ValueControl featureName={featureName} piece={piece} controlName={"Diameter"} />
			</div>
		</div>
	)
};

export default Table;
