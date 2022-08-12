import { FC, useContext, useEffect, useRef, useState } from "react";
import TimerContext from "../pages/TimerContext";

interface TimeboxProps {
	id: number;
}

const Timebox: FC<TimeboxProps> = (props) => {
	const { id } = props;
	const { activeTimeboxId, setActiveTimeboxId } = useContext(TimerContext);
	const [timeLeft, setTimeLeft] = useState(59);

	const switchToNext = () => {
		console.log(activeTimeboxId);
		if (activeTimeboxId === 3) {
			setActiveTimeboxId(1);
		} else {
			setActiveTimeboxId((prevValue: number) => prevValue + 1);
		}
	};
	const intervalRef = useRef<NodeJS.Timer | null>(null);

	const coundownCallback = () => {
		setTimeLeft((prevTimeLeft) => {
			if (prevTimeLeft > 1) return prevTimeLeft - 1;

			clearInterval(intervalRef.current);
			intervalRef.current = null;
			return 0;
		});
	};

	const startTimer = () => {
		intervalRef.current = setInterval(coundownCallback, 1000);
	};

	const stopTimer = () => {
		clearInterval(intervalRef.current);
		intervalRef.current = null;
	};

	// TODO: reset timer when timebox reaches zero and goes to the next one

	const resetTimer = () => {
		setTimeLeft(60);
	};

	// TODO: We need to fix the interval decreasing by two numbers (if you see the console.log it's actually being called three times, is it because of context?).
	// Okay, mistery solved. It's being printed 3/4 times because every timebox useEffect is being called, we probably do have only one call to startTimer (we should check)
	//TODO: Only start the timer if the task has been started.
	// TODO: Find a way to import the code of our timer/callback (each timebox might need its own ref), so you can keep things a bit dry (useTimer Hook?)
	// TODO: Change to the next timebox automatically
	useEffect(() => {
		if (activeTimeboxId === id) startTimer();
		console.log("timebox!");
		return () => {
			stopTimer();
		};
	}, [activeTimeboxId]);

	return (
		<div className="bg-white px-6 py-2 rounded-lg">
			<h3 className="text-black ">Timebox</h3>
			<div className="justify-end">
				<span className="text-kinoko-purple">00:{timeLeft}</span>
				<span>/</span>
				<span>25:00</span>
				<h5>Id: {id}</h5>
				<h5>active? {activeTimeboxId === id ? "Yes" : "No"}</h5>
				<button onClick={switchToNext}>Next</button>
			</div>
		</div>
	);
};

export default Timebox;
