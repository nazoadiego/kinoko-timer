import { useRef, useState } from "react";

// TODO If you click start two times it will go down faster
// TODO Add dynamic initial timeSet
const useTimer = (choosenTime: number) => {
	const intervalRef = useRef<NodeJS.Timer | undefined>(undefined);
	const [timeLeft, setTimeLeft] = useState(choosenTime);

	const coundownCallback = () => {
		setTimeLeft((prevTimeLeft) => {
			if (prevTimeLeft > 1) return prevTimeLeft - 1;

			clearInterval(intervalRef.current);
			intervalRef.current = undefined;
			return 0;
		});
	};

	const startTimer = () => {
		intervalRef.current = setInterval(coundownCallback, 1000);
	};

	const stopTimer = () => {
		clearInterval(intervalRef.current);
		intervalRef.current = undefined;
	};

	const resetTimer = () => {
		setTimeLeft(60);
	};

	return { startTimer, stopTimer, resetTimer, timeLeft };
};

export default useTimer;
