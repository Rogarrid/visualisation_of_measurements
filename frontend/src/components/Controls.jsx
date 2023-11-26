import React from 'react';
import ElementControl from './ElementControl';

//Row containing the names of the controls
//TODO: create the logic to render a control n times
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
