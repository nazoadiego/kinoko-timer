export const prettyTime = (timeInSeconds: number) => {
	const formatTime = (number: number) => number.toString().padStart(2, "0");

	// TODO: Add the calculation for hours. Probably a good idea to look into the next todo ->
	// TODO: you learned a better way of calculate seconds in a codewars challenge. Something with a hash. Look for it. You could get rid of Number() call and the dependency between minutes and seconds.
	// ? Make a hash/map for seconds minutes?
	// ? Should this be a separate util? Note that you would have to pass state
	// ? If you do separate it. Make it return a string with the formmated time?

	const calculateMinutes = (seconds: number) => Math.floor(seconds / 60);
	const calculateSeconds = (seconds: number, minutes: number) => {
		return seconds - minutes * 60;
	};

	const minutes = calculateMinutes(timeInSeconds);
	const seconds = calculateSeconds(timeInSeconds, minutes);

	return `${formatTime(minutes)}:${formatTime(seconds)}`;
};
