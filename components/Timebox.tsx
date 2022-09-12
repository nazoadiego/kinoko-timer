import { FC, FormEvent, useEffect, useState } from "react";
import { prettyTime } from "../utils/prettyTime";
import useTimer from "../utils/hooks/useTimer";
import PurpleButton from "./PurpleButton";

interface TimeboxProps {
	id: number;
	timeboxes: number[];
	lastTimeboxUUID: number;
	firstTimeboxUUID: number;
	currentTimeboxIndex: number;
	activeTimeboxId: number;
	setActiveTimeboxId: Dispatch<SetStateAction<number>>;
	setTimeboxes: Dispatch<SetStateAction<number[]>>;
	activeTask: boolean;
}

const Timebox: FC<TimeboxProps> = (props) => {
	const {
		id,
		timeboxes,
		setTimeboxes,
		lastTimeboxUUID,
		firstTimeboxUUID,
		currentTimeboxIndex,
		activeTimeboxId,
		setActiveTimeboxId,
		activeTask,
	} = props;
	const [durationInSeconds, setDurationInSeconds] = useState(5);

	const { startTimer, stopTimer, resetTimer, timeLeft } =
		useTimer(durationInSeconds);

	const activeTimebox = activeTimeboxId === id;

	// Next Timebox

	const switchToNext = () => {
		if (activeTimeboxId === lastTimeboxUUID) {
			setActiveTimeboxId(firstTimeboxUUID);
		} else {
			setActiveTimeboxId(timeboxes[currentTimeboxIndex + 1]);
		}

		resetTimer();
	};

	// TODO: This could be improved to only run when timeLeft is 0 instead of checking every second
	useEffect(() => {
		if (timeLeft !== 0) return;

		if (timeboxes.length === 1) {
			resetTimer();
			startTimer();
		} else {
			switchToNext();
		}

		return () => {};
	}, [timeLeft]);

	useEffect(() => {
		if (activeTimebox && activeTask) startTimer();
		if (activeTask === false) stopTimer();

		return () => {
			stopTimer();
		};
	}, [activeTimeboxId, activeTask]);

	// Delete Timebox
	const deleteTimebox = (deletedTimeboxUUID: number) => {
		const filteredTimeboxes = timeboxes.filter((timeboxUUID) => {
			return timeboxUUID !== deletedTimeboxUUID;
		});

		if (activeTimeboxId === deletedTimeboxUUID) {
			switchToNext();
		}

		if (filteredTimeboxes.length === 0) {
			setActiveTimeboxId(0);
		}

		setTimeboxes(filteredTimeboxes);
	};

	// CSS

	const activeTimeboxClass = activeTimebox
		? "outline outline-offset-1 outline-kinoko-purple transition -translate-y-0.5"
		: "";

	return (
		<div
			className={`white-card px-6 py-2 transition ease-in-out duration-300 ${activeTimeboxClass}`}
		>
			<TimeboxTitle />
			<div className="justify-end">
				<TimeboxDuration
					timeLeft={timeLeft}
					durationInSeconds={durationInSeconds}
					setDurationInSeconds={setDurationInSeconds}
				/>
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

import { Dispatch, SetStateAction } from "react";
import { FiEdit } from "react-icons/fi";
import { calculateTime } from "../utils/calculateTime";

interface TimeboxTitleProps {}

const TimeboxTitle: FC<TimeboxTitleProps> = () => {
	const [editTimeboxTitle, setEditTimeboxTitle] = useState(false);
	const [timeboxTitle, setTimeboxTitle] = useState("Timebox Title");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setEditTimeboxTitle(false);
	};

	if (editTimeboxTitle) {
		return (
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					autoFocus
					placeholder="Timebox Title"
					value={timeboxTitle}
					onChange={(e) => setTimeboxTitle(e.target.value)}
				/>
			</form>
		);
	}

	return (
		<>
			<div className="flex items-center gap-2">
				<h3 className="text-kinoko-purple">{timeboxTitle}</h3>
				<FiEdit
					className="cursor-pointer"
					onClick={() => setEditTimeboxTitle(true)}
				/>
			</div>
		</>
	);
};

interface TimeboxDurationProps {
	timeLeft: number;
	durationInSeconds: number;
	setDurationInSeconds: Dispatch<SetStateAction<number>>;
}

const TimeboxDuration: FC<TimeboxDurationProps> = (props) => {
	const [editTaskDuration, setEditTaskDuration] = useState(false);
	const { timeLeft, durationInSeconds, setDurationInSeconds } = props;
	const [taskDuration, setTaskDuration] = useState(
		calculateTime(durationInSeconds)
	);

	// Handle Save Changes
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const seconds =
			taskDuration.hours * 3600 +
			taskDuration.minutes * 60 +
			taskDuration.seconds;
		setDurationInSeconds(seconds);
		setEditTaskDuration(false);
	};

	// Display
	const timeLeftDisplay = prettyTime(timeLeft);
	const timeTotalDisplay = prettyTime(durationInSeconds);

	if (editTaskDuration) {
		return (
			<form onSubmit={(e) => handleSubmit(e)}>
				{/* <input
					type="number"
					placeholder="Hours"
					value={taskDuration.hours}
					onChange={(e) =>
						setTaskDuration({ ...taskDuration, hours: Number(e.target.value) })
					}
				/> */}
				<input
					type="number"
					autoFocus
					placeholder="Minutes"
					value={taskDuration.minutes}
					onChange={(e) =>
						setTaskDuration({
							...taskDuration,
							minutes: Number(e.target.value),
						})
					}
				/>
				<input
					type="number"
					placeholder="Seconds"
					value={taskDuration.seconds}
					onChange={(e) =>
						setTaskDuration({
							...taskDuration,
							seconds: Number(e.target.value),
						})
					}
				/>
				<PurpleButton>Save</PurpleButton>
			</form>
		);
	}

	return (
		<>
			<span className="text-kinoko-purple">{timeLeftDisplay}</span>
			<span>/</span>
			<span>{timeTotalDisplay}</span>
			<FiEdit
				className="cursor-pointer"
				onClick={() => setEditTaskDuration(true)}
			/>
		</>
	);
};

export default Timebox;
