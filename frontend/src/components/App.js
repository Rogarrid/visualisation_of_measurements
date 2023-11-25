import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { calculateDeviation } from '../script/Calculate';
import Table from './Table'
import PartName from './PartName';
import '../style/App.css'

function App() {
	const [piece, setPiece] = useState(null);

	useEffect(() => {
		const socket = io('http://localhost:3001');

		socket.on('newPiece', (newPiece) => {
			const calculatedPiece = calculateDeviation(newPiece);
			setPiece(calculatedPiece);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div>
			{piece && (
				<div>
					<PartName piece={piece}/>
					{Object.keys(piece.features).map((featureName) => (
						<Table key={featureName} featureName={featureName} piece={piece} />
					))}
				</div>
			)}
		</div>
	);
}

export default App;
