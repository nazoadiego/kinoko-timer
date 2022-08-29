export const prettyTime = (timeInSeconds: number) => {
	const formatTime = (number: number) => number.toString().padStart(2, "0");

	// ? add a default 0 to the map instead of the as number
	const timeMap = new Map([
		["hours", ~~(timeInSeconds / 3600)],
		["minutes", ~~((timeInSeconds % 3600) / 60)],
		["seconds", ~~timeInSeconds % 60],
	]);

	const hours = timeMap.get("hours") as number;
	const minutes = timeMap.get("minutes") as number;
	const seconds = timeMap.get("seconds") as number;

	return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
};
