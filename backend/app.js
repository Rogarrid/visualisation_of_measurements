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

//Value of the measure ideal and tolerance for all features
const tolerance = {
	x: 10,
	y: 15,
	z: 20,
	diameter: 5,
};

const ideal = {
	x: 70,
	y: 60,
	z: 50,
	diameter: 45,
};

//Creation of random measurement values
const generateRandomMeasure = () => {
	return Math.random() * 100;
};

//Assignment of a random measure value.
//TODO: create the logic to instantiate a control n times
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
				tolerance: tolerance.x,
			},
			y: {
				ideal: ideal.y,
				random: y,
				tolerance: tolerance.y,
			},
			z: {
				ideal: ideal.z,
				random: z,
				tolerance: tolerance.z,
			},
			diameter: {
				ideal: ideal.diameter,
				random: diameter,
				tolerance: tolerance.diameter,
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
	const featureNames = ['Outer Edge', 'Window Slot', 'Handle Hole', 'Inside Edge'];
	return generateCarPart('Car Door', featureNames);
};

const generateCarBonnet = () => {
	const featureNames = ['Ventilation Hole', 'Hole of Closure', 'Logo Slot'];
	return generateCarPart('Car Bonnet', featureNames);
};

const generateCarRoof = () => {
	const featureNames = ['Sunroof Hole', 'Roof Rails'];
	return generateCarPart('Car Roof', featureNames);
};

//Connection of the new client and random generation of a new part.
io.on('connection', (socket) => {
	console.log('Nuevo cliente conectado');

	interval = setInterval(() => {
		const randomPieceIndex = Math.floor(Math.random() * 3);
		let randomPiece;

		switch (randomPieceIndex) {
			case 0:
				randomPiece = generateCarDoor();
				break;
			case 1:
				randomPiece = generateCarBonnet();
				break;
			case 2:
				randomPiece = generateCarRoof();
				break;
			default:
				randomPiece = null;
		}
		socket.emit('newPiece', randomPiece);
	}, 10000);

	socket.on('disconnect', () => {
		console.log('Cliente desconectado');
		clearInterval(interval);
	});
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`Servidor backend con WebSocket corriendo en el puerto ${PORT}`);
});
