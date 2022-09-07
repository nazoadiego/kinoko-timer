// ? Pretty time gets called like 8 times on first render (when there are 4 timers)

import { calculateTime } from "./calculateTime";

export const prettyTime = (timeInSeconds: number) => {
	const formatTime = (quantity: number, timeUnit: string) => {
		return quantity.toString().padStart(2, "0") + timeUnit;
	};

	const { hours, minutes, seconds } = calculateTime(timeInSeconds);

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
