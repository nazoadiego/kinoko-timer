const oneMinute = 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

export const calculateTime = (timeInSeconds: number) => {
	return {
		hours: { type: "h", quantity: ~~((timeInSeconds % oneDay) / oneHour) },
		minutes: {
			type: "m",
			quantity: ~~((timeInSeconds % oneHour) / oneMinute),
		},
		seconds: { type: "s", quantity: ~~timeInSeconds % oneMinute },
	};
};
