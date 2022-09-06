const oneMinute = 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

export const calculateTime = (timeInSeconds: number) => {
	return [
		{ type: "h", quantity: ~~((timeInSeconds % oneDay) / oneHour) },
		{ type: "m", quantity: ~~((timeInSeconds % oneHour) / oneMinute) },
		{ type: "s", quantity: ~~timeInSeconds % oneMinute },
	];
};
