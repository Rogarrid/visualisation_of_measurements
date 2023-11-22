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
			  {Object.keys(piece.features).map((featureName) => (
				<div key={featureName}>
				  <h3>{featureName}</h3>
				  <table>
					<thead>
					  <tr>
						<th>Control</th>
						<th>Dev</th>
						<th>Dev Out</th>
					  </tr>
					</thead>
					<tbody>
					  <tr>
						<td>x</td>
						<td>{piece.features[featureName].x.dev.toFixed(2)}</td>
						<td>{piece.features[featureName].x.devOutTolerance.toFixed(2)}</td>
						<td>{piece.features[featureName].x.status}</td>
					  </tr>
					  <tr>
						<td>y</td>
						<td>{piece.features[featureName].y.dev.toFixed(2)}</td>
						<td>{piece.features[featureName].y.devOutTolerance.toFixed(2)}</td>
						<td>{piece.features[featureName].y.status}</td>
					  </tr>
					  <tr>
						<td>z</td>
						<td>{piece.features[featureName].z.dev.toFixed(2)}</td>
						<td>{piece.features[featureName].z.devOutTolerance.toFixed(2)}</td>
						<td>{piece.features[featureName].z.status}</td>
					  </tr>
					  <tr>
						<td>diameter</td>
						<td>{piece.features[featureName].diameter.dev.toFixed(2)}</td>
						<td>{piece.features[featureName].diameter.devOutTolerance.toFixed(2)}</td>
						<td>{piece.features[featureName].diameter.status}</td>
					  </tr>
					</tbody>
				  </table>
				</div>
			  ))}
			</div>
		  )}
		</div>
	  );
	}

export default App;
