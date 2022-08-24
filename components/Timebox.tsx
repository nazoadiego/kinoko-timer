import { FC, useContext, useEffect, useRef, useState } from "react";
import TimerContext from "../pages/TimerContext";
import { prettyTime } from "../utils/prettyTime";
import useTimer from "../utils/useTimer";
import PurpleButton from "./PurpleButton";

interface TimeboxProps {
	id: number;
	deleteTimebox: (timeboxIndex: number) => void;
	timeboxes: number[];
}

const Timebox: FC<TimeboxProps> = (props) => {
	const { id, deleteTimebox, timeboxes } = props;
	const { activeTimeboxId, setActiveTimeboxId, activeTask, lastTimeboxId } =
		useContext(TimerContext);
	const [choosenTime, setChoosenTime] = useState(10);
	const { startTimer, stopTimer, resetTimer, timeLeft } = useTimer(choosenTime);

	const activeTimebox = activeTimeboxId === id;

	const switchToNext = () => {
		if (activeTimeboxId === timeboxes.length) {
			setActiveTimeboxId(1);
		} else {
			setActiveTimeboxId((prevValue: number) => prevValue + 1);
		}

		resetTimer();
	};

	// TODO: This could be improved to only run when timeLeft is 0 instead of checking every second
	useEffect(() => {
		if (timeLeft === 0) switchToNext();

		return () => {};
	}, [timeLeft]);

	useEffect(() => {
		if (activeTimebox) startTimer();
		if (activeTask === false) stopTimer();
		return () => {
			stopTimer();
		};
	}, [activeTimeboxId, activeTask]);

	const timeLeftDisplay = prettyTime(timeLeft);
	const timeTotalDisplay = prettyTime(choosenTime);

	// CSS

	const activeTimeboxClass = activeTimebox
		? "outline outline-offset-1 outline-kinoko-purple transition -translate-y-0.5"
		: "";

	return (
		<div
			className={`white-card px-6 py-2 transition ease-in-out duration-300 ${activeTimeboxClass}`}
		>
			<h3>Timebox</h3>
			<div className="justify-end">
				<span className="text-kinoko-purple">{timeLeftDisplay}</span>
				<span>/</span>
				<span>{timeTotalDisplay}</span>
				<h5>Id: {id}</h5>
				<h5>active? {activeTimebox ? "Yes" : "No"}</h5>
				<div className="my-2 space-x-2 space-y-2">
					<PurpleButton clickEvent={switchToNext}>Next</PurpleButton>
					<PurpleButton clickEvent={() => setActiveTimeboxId(id)}>
						Active
					</PurpleButton>
					<PurpleButton clickEvent={resetTimer}>Reset Timer</PurpleButton>
					<PurpleButton clickEvent={() => deleteTimebox(id)}>
						Delete
					</PurpleButton>
				</div>
			</div>
		</div>
	);
};

export default Timebox;
