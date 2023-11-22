import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function App() {
	const [piece, setPiece] = useState(null);

	useEffect(() => {
		const socket = io('http://localhost:3001');  // Ajusta la URL al puerto de tu backend

		socket.on('newPiece', (newPiece) => {
			setPiece(newPiece);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div>
		  <h1>Nueva Pieza:</h1>
		  {piece && (
			<div>
			  <h2>Nombre de la Pieza: {piece.name}</h2>
			  <h3>Características:</h3>
			  <ul>
				{Object.keys(piece.features).map((featureName) => (
				  <li key={featureName}>
					<h4>{featureName}</h4>
					<p>X: {piece.features[featureName].x.dev.toFixed(2)} ({piece.features[featureName].x.status})</p>
					<p>Y: {piece.features[featureName].y.dev.toFixed(2)} ({piece.features[featureName].y.status})</p>
					<p>Z: {piece.features[featureName].z.dev.toFixed(2)} ({piece.features[featureName].z.status})</p>
					<p>Diameter: {piece.features[featureName].diameter.dev.toFixed(2)} ({piece.features[featureName].diameter.status})</p>
				  </li>
				))}
			  </ul>
			  <p>Estado General: {piece.features[Object.keys(piece.features)[0]].status}</p>
			</div>
		  )}
		</div>
	);
}

export default App;
