// ? Pretty time gets called like 8 times on first render (when there are 4 timers)

export const prettyTime = (timeInSeconds: number) => {
	const formatTime = (number: number) => number.toString().padStart(2, "0");

	const oneMinute = 60;
	const oneHour = oneMinute * 60;
	const oneDay = oneHour * 24;

	const calculateTime = (timeInSeconds: number) => {
		return [
			~~((timeInSeconds % oneDay) / oneHour), // hours
			~~((timeInSeconds % oneHour) / oneMinute), // minutes
			~~timeInSeconds % oneMinute, // seconds
		];
	};

	const [hours, minutes, seconds] = calculateTime(timeInSeconds);

	let timeUnits = [hours, minutes, seconds];

	if (hours === 0) {
		timeUnits = [minutes, seconds];
	}

	const formattedTimeUnits = timeUnits.map((timeUnit) => formatTime(timeUnit));

	return formattedTimeUnits.join(":");
};
