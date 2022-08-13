import { FC, useContext, useEffect, useRef, useState } from "react";
import TimerContext from "../pages/TimerContext";
import useTimer from "../utils/useTimer";

interface TimeboxProps {
	id: number;
}

const Timebox: FC<TimeboxProps> = (props) => {
	const { id } = props;
	const { activeTimeboxId, setActiveTimeboxId } = useContext(TimerContext);
	const [choosenTime, setChoosenTime] = useState(10);
	const { startTimer, stopTimer, resetTimer, timeLeft } = useTimer(choosenTime);

	const switchToNext = () => {
		if (activeTimeboxId === 3) {
			setActiveTimeboxId(1);
		} else {
			setActiveTimeboxId((prevValue: number) => prevValue + 1);
		}
		resetTimer();
	};

	// TODO: This could be improved to only run when timeLeft is 0 instead of checking every second
	// TODO: stop timebox when task button stop timer is pushed

	useEffect(() => {
		if (timeLeft === 0) switchToNext();

		return () => {};
	}, [timeLeft]);

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
