import { FC, useContext, useEffect, useRef, useState } from "react";
import TimerContext from "../pages/TimerContext";
import { prettyTime } from "../utils/prettyTime";
import useTimer from "../utils/useTimer";
import PurpleButton from "./Button";

interface TimeboxProps {
	id: number;
}

const Timebox: FC<TimeboxProps> = (props) => {
	const { id } = props;
	const { activeTimeboxId, setActiveTimeboxId, activeTask } =
		useContext(TimerContext);
	const [choosenTime, setChoosenTime] = useState(10);
	const { startTimer, stopTimer, resetTimer, timeLeft } = useTimer(choosenTime);

	const switchToNext = () => {
		// TODO: this is dependant on there being 3 timeboxes. It should be the last timebox. Not third one.
		if (activeTimeboxId === 3) {
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
		if (activeTimeboxId === id) startTimer();
		if (activeTask === false) stopTimer();
		return () => {
			stopTimer();
		};
	}, [activeTimeboxId, activeTask]);

	const timeLeftDisplay = prettyTime(timeLeft);
	const timeTotalDisplay = prettyTime(choosenTime);

	return (
		<div className="bg-white px-6 py-2 rounded-lg">
			<h3 className="text-black ">Timebox</h3>
			<div className="justify-end">
				<span className="text-kinoko-purple">{timeLeftDisplay}</span>
				<span>/</span>
				<span>{timeTotalDisplay}</span>
				<h5>Id: {id}</h5>
				<h5>active? {activeTimeboxId === id ? "Yes" : "No"}</h5>
				<div className="my-2 space-x-2">
					<PurpleButton clickEvent={switchToNext}>Next</PurpleButton>
					<PurpleButton clickEvent={() => setActiveTimeboxId(id)}>
						Active
					</PurpleButton>
				</div>
			</div>
		</div>
	);
};

export default Timebox;
