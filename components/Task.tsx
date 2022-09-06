import {
	useEffect,
	useState,
	Dispatch,
	FC,
	SetStateAction,
	FormEvent,
} from "react";
import PurpleButton from "../components/PurpleButton";
import Timebox from "../components/Timebox";
import { prettyTime } from "../utils/prettyTime";
import useTimer from "../utils/hooks/useTimer";
import TimerContext from "../pages/TimerContext";
import { FiEdit } from "react-icons/fi";
import { calculateTime } from "../utils/calculateTime";

interface TaskProps {
	playAudio: () => void;
}

const Task: FC<TaskProps> = ({ playAudio }) => {
	// Task
	const [activeTask, setActiveTask] = useState(false);
	const [taskDuration, setTaskDuration] = useState(30);

	// Timer
	const { startTimer, stopTimer, resetTimer, timeLeft } =
		useTimer(taskDuration);

	// Timeboxes
	const [activeTimeboxId, setActiveTimeboxId] = useState(0);
	const [timeboxes, setTimeboxes] = useState([1, 2, 3]);
	const lastTimeboxUUID = timeboxes.slice(-1)[0];
	const firstTimeboxUUID = timeboxes[0];
	const currentTimeboxIndex = timeboxes.findIndex(
		(timebox) => timebox === activeTimeboxId
	);

	// Delete Timebox
	const deleteTimebox = (timeboxIndex: number) => {
		const filteredTimeboxes = timeboxes.filter((timebox) => {
			return timebox !== timeboxIndex;
		});

		setTimeboxes(filteredTimeboxes);
	};

	// Add Timebox
	const addTimebox = () => {
		setTimeboxes([...timeboxes, lastTimeboxUUID + 1]);
	};

	// Context

	const value = {
		activeTimeboxId,
		setActiveTimeboxId,
		activeTask,
	};

	// Task Timer

	const startTask = () => {
		if (activeTimeboxId === 0) setActiveTimeboxId(1);

		if (activeTask !== true) startTimer();
		setActiveTask(true);
	};

	const stopTask = () => {
		stopTimer();
		setActiveTask(false);
	};

	// Audio
	useEffect(() => {
		playAudio();
	}, [activeTimeboxId]);

	return (
		<main className="grid grid-cols-2 gap-2">
			<div className="white-card flex flex-col items-center justify-center">
				<TaskTitle />
				<TaskDuration
					timeLeft={timeLeft}
					taskDuration={taskDuration}
					setTaskDuration={setTaskDuration}
				/>
				<div className="space-y-5 flex flex-col mt-10">
					<PurpleButton clickEvent={startTask}>Start Timer</PurpleButton>
					<PurpleButton clickEvent={stopTask}>Stop Timer</PurpleButton>
					<PurpleButton clickEvent={resetTimer}>Reset Timer</PurpleButton>
					<PurpleButton clickEvent={addTimebox}>Add Timebox</PurpleButton>
				</div>
				<div className="mt-6">
					<h5>timeboxes size: {timeboxes.length}</h5>
					<h5>active?: {activeTask ? "Yes" : "No"}</h5>
					<h5>activeTimeboxId?: {activeTimeboxId}</h5>
					<h5>currentTimeboxIndex: {currentTimeboxIndex}</h5>
				</div>
			</div>
			{/* Timeboxes */}
			<div className="space-y-3">
				<h2 className="text-white">Timeboxes</h2>
				<TimerContext.Provider value={value}>
					{timeboxes.map((id) => (
						<Timebox
							id={id}
							key={id}
							lastTimeboxUUID={lastTimeboxUUID}
							firstTimeboxUUID={firstTimeboxUUID}
							currentTimeboxIndex={currentTimeboxIndex}
							deleteTimebox={deleteTimebox}
							timeboxes={timeboxes}
						/>
					))}
				</TimerContext.Provider>
			</div>
		</main>
	);
};

interface TaskTitleProps {}

const TaskTitle: FC<TaskTitleProps> = () => {
	const [editTaskTitle, setEditTaskTitle] = useState(false);
	const [taskTitle, setTaskTitle] = useState("Reading Japanese");

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

	if (editTaskTitle) {
		return (
			<input
				type="text"
				autoFocus
				placeholder="Task Title"
				value={taskTitle}
				// We are triggering twice here? change and keypress
				onChange={(e) => setTaskTitle(e.target.value)}
				onKeyPress={(e) => handleSaveChanges(e, setEditTaskTitle)}
			/>
		);
	} else {
		return (
			<>
				<h2>Task</h2>
				<div className="flex items-center gap-2">
					<h3 className="text-kinoko-purple">{taskTitle}</h3>
					<FiEdit
						className="cursor-pointer"
						onClick={() => setEditTaskTitle(true)}
					/>
				</div>
			</>
		);
	}
};

interface TaskDurationProps {
	timeLeft: number;
	taskDuration: number;
	setTaskDuration: Dispatch<SetStateAction<number>>;
}

const TaskDuration: FC<TaskDurationProps> = (props) => {
	const [editTaskDuration, setEditTaskDuration] = useState(false);
	const { timeLeft, taskDuration, setTaskDuration } = props;
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const [hours, minutes, seconds] = calculateTime(taskDuration);
		setHours(hours.quantity);
		setMinutes(minutes.quantity);
		setSeconds(seconds.quantity);
	}, []);

	// Handle Save Changes
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const newTaskDuration = hours * 3600 + minutes * 60 + seconds;
		setTaskDuration(newTaskDuration);
		setEditTaskDuration(false);
	};

	const handleUserInput = (
		newValue: number,
		setState: Dispatch<SetStateAction<number>>
	) => {
		setState(newValue);
	};

	// Display
	const timeLeftDisplay = prettyTime(timeLeft);
	const timeTotalDisplay = prettyTime(taskDuration);

	if (editTaskDuration) {
		return (
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="number"
					placeholder="Hours"
					value={hours}
					onChange={(e) => handleUserInput(Number(e.target.value), setHours)}
				/>
				<input
					type="number"
					autoFocus
					placeholder="Minutes"
					value={minutes}
					onChange={(e) => handleUserInput(Number(e.target.value), setMinutes)}
				/>
				<input
					type="number"
					placeholder="Seconds"
					value={seconds}
					onChange={(e) => handleUserInput(Number(e.target.value), setSeconds)}
				/>
				<PurpleButton>Save</PurpleButton>
			</form>
		);
	} else {
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
	}
};

export default Task;