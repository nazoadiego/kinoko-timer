// ? Pretty time gets called like 8 times on first render (when there are 4 timers)

import { calculateTime } from "./calculateTime";

type TimeUnit = { quantity: number; type: string };

export const prettyTime = (timeInSeconds: number) => {
	const formatTime = (timeUnit: TimeUnit) => {
		return timeUnit.quantity.toString().padStart(2, "0") + timeUnit.type;
	};

	const { hours, minutes, seconds } = calculateTime(timeInSeconds);

	let timeUnits: TimeUnit[] = [
		{ quantity: hours, type: "h" },
		{ quantity: minutes, type: "m" },
		{ quantity: seconds, type: "s" },
	];

	const hideHours = hours === 0; // ? Make hiding hours a setting?
	if (hideHours) {
		timeUnits = timeUnits.slice(1);
	}

	const formattedTimeUnits = timeUnits.map((timeUnit) => {
		return formatTime(timeUnit);
	});

	return formattedTimeUnits.join(" ");
};
