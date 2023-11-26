import React from 'react';
import ElementControl from './ElementControl';

//Row containing the names of the controls
const Controls = () => {
	return (
		<div className="row">
			<ElementControl nameControl={"Control"}/>
			<ElementControl nameControl={"Dev"}/>
			<ElementControl nameControl={"Dev Out Tol"}/>
			<ElementControl nameControl={""}/>
		</div>
	);
};

export default Controls;
