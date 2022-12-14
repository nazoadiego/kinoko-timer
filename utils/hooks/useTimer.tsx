import { useEffect, useRef, useState } from "react";

const useTimer = (taskDuration: number) => {
	const intervalRef = useRef<NodeJS.Timer | undefined>(undefined);
	const [timeLeft, setTimeLeft] = useState(taskDuration);

	const coundownCallback = () => {
		setTimeLeft((prevTimeLeft) => {
			if (prevTimeLeft > 1) return prevTimeLeft - 1;

			clearInterval(intervalRef.current);
			intervalRef.current = undefined;
			return 0;
		});
	};

	const startTimer = () => {
		if (intervalRef.current !== undefined) return;

		intervalRef.current = setInterval(coundownCallback, 1000);
	};

	const stopTimer = () => {
		clearInterval(intervalRef.current);
		intervalRef.current = undefined;
	};

	const resetTimer = () => {
		setTimeLeft(taskDuration);
	};

	// ? Up to preference, always update time left when choosing your time or not
	useEffect(() => {
		// if (timeLeft > taskDuration) {
		// 	resetTimer();
		// }
		resetTimer();
	}, [taskDuration]);

	return { startTimer, stopTimer, resetTimer, timeLeft, setTimeLeft };
};

export default useTimer;
