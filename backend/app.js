const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

let interval;

//value of the measure ideal and tolerance for all features
const tolerance = 10;
const ideal = {
	x: 50,
	y: 50,
	z: 50,
	diameter: 50,
};

//Creation of random measurement values
const generateRandomMeasure = () => {
	return Math.random() * 100;
};

//Assignment of a random measure value and calculation of deviation
const generateFeature = (featureName) => {
	const x = generateRandomMeasure();
	const y = generateRandomMeasure();
	const z = generateRandomMeasure();
	const diameter = generateRandomMeasure();

	return {
		[featureName]: {
			x: {
				ideal: ideal.x,
				random: x,
				tolerance: tolerance,
			},
			y: {
				ideal: ideal.y,
				random: y,
				tolerance: tolerance,
			},
			z: {
				ideal: ideal.z,
				random: z,
				tolerance: tolerance,
			},
			diameter: {
				ideal: ideal.diameter,
				random: diameter,
				tolerance: tolerance,
			},
		},
	};
};

//Generate the car part with all its features and values.
const generateCarPart = (name, featureNames) => {
	const features = {};
	featureNames.forEach((featureName, index) => {
		Object.assign(features, generateFeature(featureName));
	});
	return { name, features };
};

//Start generating the new parts and their characteristics.
const generateCarDoor = () => {
	const featureNames = ['outerEdge', 'windowSlot', 'handleHole', 'insideEdge'];
	return generateCarPart('car door', featureNames);
};

const generateCarBonnet = () => {
	const featureNames = ['ventilationHole', 'holeOfClosure', 'logoSlot'];
	return generateCarPart('car bonnet', featureNames);
};

//Connection of the new client and random generation of a new part.
io.on('connection', (socket) => {
	console.log('Nuevo cliente conectado');

	interval = setInterval(() => {
		const randomPiece = Math.random() < 0.5 ? generateCarDoor() : generateCarBonnet();
		socket.emit('newPiece', randomPiece);
	}, 3000);

	socket.on('disconnect', () => {
		console.log('Cliente desconectado');
		clearInterval(interval);
	});
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`Servidor backend con WebSocket corriendo en el puerto ${PORT}`);
});
