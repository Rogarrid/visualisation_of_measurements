import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { calculateDeviation } from './Calculate';
import './App.css';

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
					<h2 className="piece-name">{piece.name}</h2>
					{Object.keys(piece.features).map((featureName) => (
						<div key={featureName} className="feature-card">
							<h3 className="feature-name">{featureName}</h3>
							<div className="table-container">
								<div className="row header">
									<div className="cell">Control</div>
									<div className="cell">Dev</div>
									<div className="cell">Dev Out</div>
									<div className="cell">Status</div>
								</div>
								<div className="row">
									<div className="element">x</div>
									<div className="cell">{piece.features[featureName].x.dev.toFixed(2)}</div>
									<div className="cell">{piece.features[featureName].x.devOutTolerance.toFixed(2)}</div>
									<div className={`cell ${piece.features[featureName].x.status.toLowerCase()}`}>
										{piece.features[featureName].x.status}
									</div>
								</div>
								<div className="row">
									<div className="element">y</div>
									<div className="cell">{piece.features[featureName].y.dev.toFixed(2)}</div>
									<div className="cell">{piece.features[featureName].y.devOutTolerance.toFixed(2)}</div>
									<div className={`cell ${piece.features[featureName].y.status.toLowerCase()}`}>
										{piece.features[featureName].y.status}
									</div>
								</div>
								<div className="row">
									<div className="element">z</div>
									<div className="cell">{piece.features[featureName].z.dev.toFixed(2)}</div>
									<div className="cell">{piece.features[featureName].z.devOutTolerance.toFixed(2)}</div>
									<div className={`cell ${piece.features[featureName].z.status.toLowerCase()}`}>
										{piece.features[featureName].z.status}
									</div>
								</div>
								<div className="row">
									<div className="element">diameter</div>
									<div className="cell">{piece.features[featureName].diameter.dev.toFixed(2)}</div>
									<div className="cell">{piece.features[featureName].diameter.devOutTolerance.toFixed(2)}</div>
									<div
										className={`cell ${piece.features[featureName].diameter.status.toLowerCase()}`}
									>
										{piece.features[featureName].diameter.status}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default App;
