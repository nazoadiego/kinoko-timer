import { FC, useEffect, useState } from "react";
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
	const [choosenTime, setChoosenTime] = useState(5);

	// ? if we change choosen time, we should adapt timeLeft as well
	const { startTimer, stopTimer, resetTimer, timeLeft } = useTimer(choosenTime);

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

	// Time Display

	const timeLeftDisplay = prettyTime(timeLeft);
	const timeTotalDisplay = prettyTime(choosenTime);

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

import { Dispatch, SetStateAction } from "react";
import { FiEdit } from "react-icons/fi";

interface TaskTitleProps {}

const TimeboxTitle: FC = () => {
	const [editTimeboxTitle, setEditTimeboxTitle] = useState(false);
	const [timeboxTitle, setTimeboxTitle] = useState("Timebox Title");

	// Handle Save Changes

	// On Enter save and hide the form
	const handleSaveChanges = (
		e: KeyboardEvent,
		displayEdit: Dispatch<SetStateAction<boolean>>
	) => {
		if (e.key === "Enter") {
			displayEdit(false);
		}
	};

	if (editTimeboxTitle) {
		return (
			<input
				type="text"
				autoFocus
				placeholder="Timebox Title"
				value={timeboxTitle}
				// We are triggering twice here? change and keypress
				onChange={(e) => setTimeboxTitle(e.target.value)}
				onKeyPress={(e) => handleSaveChanges(e, setEditTimeboxTitle)}
			/>
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

export default Timebox;
