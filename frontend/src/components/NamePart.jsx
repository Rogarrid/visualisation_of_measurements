import React from 'react';

//Creation of the generated car part name
const NamePart = ({piece}) => {

	return (
		<div className="partName">
			<h2 className="piece-name">{piece.name}</h2>
		</div>
	);
};

export default NamePart;
