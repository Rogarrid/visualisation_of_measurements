//Calculation desviation out tolerance.
export const calculatedevOutTolerance = (deviation, tolerance) => {
	if (deviation < 0 && deviation < tolerance * -1) {
		return deviation + tolerance;
	} else if (deviation > 0 && deviation > tolerance) {
		return deviation - tolerance;
	} else {
		return 0;
	}
};

//Calculation of the desviation and status of new part
export const calculateDeviation = (part) => {
	const calculatedValues = { ...part };

	Object.keys(calculatedValues.features).forEach((featureName) => {
		const measurements = calculatedValues.features[featureName];

		Object.keys(measurements).forEach((control) => {
			const measurement = measurements[control];
			const deviation = measurement.random - measurement.ideal;
			const deviationOutTolerance = calculatedevOutTolerance(deviation, measurement.tolerance);

			let range = 0.3 * measurement.ideal;

			let upperBound = [
				measurement.ideal + range - measurement.tolerance,
				measurement.ideal + range + measurement.tolerance,
			];

			let lowerBound = [
				measurement.ideal - range - measurement.tolerance,
				measurement.ideal - range + measurement.tolerance,
			];

			let status;
			if (measurement.random < upperBound[0] && measurement.random > lowerBound[1]) {
				status = 'green';
			} else if (
				(measurement.random >= lowerBound[0] && measurement.random <= lowerBound[1]) ||
				(measurement.random >= upperBound[0] && measurement.random <= upperBound[1])
			) {
				status = 'yellow';
			} else {
				status = "red";
			}

			measurements[control] = {
				dev: deviation,
				devOutTolerance: deviationOutTolerance,
				status: status,
			};
		});
	});

	return calculatedValues;
};
