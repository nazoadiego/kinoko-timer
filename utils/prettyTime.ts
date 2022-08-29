export const prettyTime = (timeInSeconds: number) => {
	const formatTime = (number: number) => number.toString().padStart(2, "0");

	const timeMap = new Map([
		["hours", ~~(timeInSeconds / 3600)],
		["minutes", ~~((timeInSeconds % 3600) / 60)],
		["seconds", ~~timeInSeconds % 60],
	]);

	const [hours, minutes, seconds] = [
		timeMap.get("hours") || 0,
		timeMap.get("minutes") || 0,
		timeMap.get("second") || 0,
	];

	// ? Only return hours if it exist, otherwise return minutes and seconds because it looks cleaner
	return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
};
