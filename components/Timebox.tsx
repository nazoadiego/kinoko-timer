import { FC, useContext, useEffect, useRef, useState } from "react";
import TimerContext from "../pages/TimerContext";
import useTimer from "../utils/useTimer";

interface TimeboxProps {
	id: number;
}

const Timebox: FC<TimeboxProps> = (props) => {
	const { id } = props;
	const { activeTimeboxId, setActiveTimeboxId } = useContext(TimerContext);
	const [choosenTime, setChoosenTime] = useState(59);
	const [startTimer, stopTimer, resetTimer, timeLeft] = useTimer(choosenTime);

	const switchToNext = () => {
		if (activeTimeboxId === 3) {
			setActiveTimeboxId(1);
		} else {
			setActiveTimeboxId((prevValue: number) => prevValue + 1);
		}
	};

	// TODO: This could be improved to only run when timeLeft is 0 instead of checking every second
	useEffect(() => {
		if (timeLeft === 0) switchToNext();

		return () => {};
	}, [timeLeft]);

	// TODO: reset timer when timebox reaches zero and goes to the next one
	// TODO: Only start the timer if the task has been started. And make sure they start at sync.
	// TODO: Find a way to import the code of our timer/callback (each timebox might need its own ref), so you can keep things a bit dry (useTimer Hook?)
	// TODO: Change to the next timebox automatically
	useEffect(() => {
		if (activeTimeboxId === id) startTimer();

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
				<span>00:{choosenTime}</span>
				<h5>Id: {id}</h5>
				<h5>active? {activeTimeboxId === id ? "Yes" : "No"}</h5>
				<button onClick={switchToNext}>Next</button>
			</div>
		</div>
	);
};

export default Timebox;
