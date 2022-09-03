// ? Pretty time gets called like 8 times on first render (when there are 4 timers)

export const prettyTime = (timeInSeconds: number) => {
	const formatTime = (quantity: number, timeUnit: string) => {
		return quantity.toString().padStart(2, "0") + timeUnit;
	};

	const oneMinute = 60;
	const oneHour = oneMinute * 60;
	const oneDay = oneHour * 24;

	const calculateTime = (timeInSeconds: number) => {
		return [
			{ type: "h", quantity: ~~((timeInSeconds % oneDay) / oneHour) },
			{ type: "m", quantity: ~~((timeInSeconds % oneHour) / oneMinute) },
			{ type: "s", quantity: ~~timeInSeconds % oneMinute },
		];
	};

	const [hours, minutes, seconds] = calculateTime(timeInSeconds);

	let timeUnits = [hours, minutes, seconds];

	const hideHours = hours.quantity === 0; // ? Make hiding hours a setting?
	if (hideHours) {
		timeUnits = [minutes, seconds];
	}

	const formattedTimeUnits = timeUnits.map((timeUnit) => {
		return formatTime(timeUnit.quantity, timeUnit.type);
	});

	return formattedTimeUnits.join(" ");
};
