const oneMinute = 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

export const calculateTime = (timeInSeconds: number) => {
	return {
		hours: ~~((timeInSeconds % oneDay) / oneHour),
		minutes: ~~((timeInSeconds % oneHour) / oneMinute),
		seconds: ~~timeInSeconds % oneMinute,
	};
};
