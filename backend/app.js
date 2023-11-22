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
const tolerance = 2;
const ideal = {
  x: 50,
  y: 50,
  z: 50,
  diameter: 50,
};

//Calculation of the desviation, desviation out tolerance and status of new part
const calculateDeviation = (ideal, actual) => {
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

//Creation of random measurement values
const generateRandomMeasure = () => {
  return Math.random() * 35;
};

//Assignment of a random measure value and calculation of deviation
const generateFeature = (featureName) => {
  const x = generateRandomMeasure();
  const y = generateRandomMeasure();
  const z = generateRandomMeasure();
  const diameter = generateRandomMeasure();

  return {
    [featureName]: {
      x: calculateDeviation(ideal.x, x),
      y: calculateDeviation(ideal.y, y),
      z: calculateDeviation(ideal.z, z),
      diameter: calculateDeviation(ideal.diameter, diameter),
    }
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
  const featureNames = ['ventilationHole', 'airSlot', 'outerEdge', 'holeOfClosure', 'logoSlot'];
  return generateCarPart('car bonnet', featureNames);
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
