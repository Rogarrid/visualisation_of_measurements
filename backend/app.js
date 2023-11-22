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
const idealX =50;
const idealY = 50;
const idealZ = 50;
const idealDiameter = 50;

const toleranceX = 2;
const toleranceY = 2;
const toleranceZ = 2;
const toleranceDiameter = 2;

const calculateDeviation = (ideal, actual, tolerance) => {
	const range = 0.3 * ideal;

	const lowerBound = range - tolerance;
	const upperBound = range + tolerance;

	const deviation = actual - ideal;
	const deviationOutTolerance = actual - (ideal + tolerance);

	if (lowerBound > actual) {
	  return { dev: deviation, devOutTolerance: deviationOutTolerance, status: "green" };
	} else if (lowerBound <= actual && actual <= upperBound) {
	  return { dev: deviation, devOutTolerance: deviationOutTolerance, status: "yellow" };
	} else {
	  return { dev: deviation, devOutTolerance: deviationOutTolerance, status: "red" };
	}
  };


  const generateRandomMeasure = () => {
	return Math.random() * 35;
  };

  const generateFeature = (idealX, idealY, idealZ, idealDiameter, toleranceX, toleranceY, toleranceZ, toleranceDiameter) => {
	const x = generateRandomMeasure();
	const y = generateRandomMeasure();
	const z = generateRandomMeasure10();
	const diameter = generateRandomMeasure();

	const deviationX = calculateDeviation(idealX, x, toleranceX);
	const deviationY = calculateDeviation(idealY, y, toleranceY);
	const deviationZ = calculateDeviation(idealZ, z, toleranceZ);
	const deviationDiameter = calculateDeviation(idealDiameter, diameter, toleranceDiameter);

	return {
	  x: deviationX,
	  y: deviationY,
	  z: deviationZ,
	  diameter: deviationDiameter,
	  status: [deviationX.status, deviationY.status, deviationZ.status, deviationDiameter.status].every((s) => s === 'green') ? 'green' : 'red',
	};
  };

  const generateCarDoor = () => {
	const features = {
	  outerEdge: generateFeature(idealX, idealY, idealZ, idealDiameter, toleranceX, toleranceY, toleranceZ, toleranceDiameter),
	  windowSlot: generateFeature(idealX, idealY, idealZ, idealDiameter, toleranceX, toleranceY, toleranceZ, toleranceDiameter),
	  handleHole: generateFeature(idealX, idealY, idealZ, idealDiameter, toleranceX, toleranceY, toleranceZ, toleranceDiameter),
	  insideEdge: generateFeature(idealX, idealY, idealZ, idealDiameter, toleranceX, toleranceY, toleranceZ, toleranceDiameter),
	};

	return { name: 'car door', features };
  };

  const generateCarBonnet = () => {
	const features = {
	  ventilationHole: generateFeature(idealX, idealY, idealZ, idealDiameter, toleranceX, toleranceY, toleranceZ, toleranceDiameter),
	  airSlot: generateFeature(idealX, idealY, idealZ, idealDiameter, toleranceX, toleranceY, toleranceZ, toleranceDiameter),
	  outerEdge: generateFeature(idealX, idealY, idealZ, idealDiameter, toleranceX, toleranceY, toleranceZ, toleranceDiameter),
	  holeOfClosure: generateFeature(idealX, idealY, idealZ, idealDiameter, toleranceX, toleranceY, toleranceZ, toleranceDiameter),
	  logoSlot: generateFeature(idealX, idealY, idealZ, idealDiameter, toleranceX, toleranceY, toleranceZ, toleranceDiameter),
	};

	return { name: 'car bonnet', features };
  };

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
