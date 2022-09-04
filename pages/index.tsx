import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import PurpleButton from "../components/PurpleButton";
import TaskTitle from "../components/TaskTitle";
import Timebox from "../components/Timebox";
import { prettyTime } from "../utils/prettyTime";
import useTimer from "../utils/useTimer";
import TimerContext from "./TimerContext";

const Home: NextPage = () => {
	// Task
	const [activeTask, setActiveTask] = useState(false);

	// Timer
	const [choosenTime, setChoosenTime] = useState(30);
	const { startTimer, stopTimer, resetTimer, timeLeft } = useTimer(choosenTime);

	// Timeboxes
	const [activeTimeboxId, setActiveTimeboxId] = useState(0);
	const [timeboxes, setTimeboxes] = useState([1, 2, 3]);
	const lastTimeboxUUID = timeboxes.slice(-1)[0];
	const firstTimeboxUUID = timeboxes[0];
	const currentTimeboxIndex = timeboxes.findIndex(
		(timebox) => timebox === activeTimeboxId
	);

	// Delete Timebox
	// ? We need to use the timeboxIndex. Definitely rethink how we are dealing with timeboxes and ids
	const deleteTimebox = (timeboxIndex: number) => {
		// 	if (timeboxes.length === 1) return;
		// 	let filteredTimeboxes: number[] = [];
		// 	if (timeboxes.length === 2) {
		// 		filteredTimeboxes = [1];
		// 	}
		// 	if (timeboxes.length === 3) {
		// 		filteredTimeboxes = [1, 2];
		// 	}
		// 	setTimeboxes(filteredTimeboxes);
		const filteredTimeboxes = timeboxes.filter((timebox) => {
			return timebox !== timeboxIndex;
		});

		setTimeboxes(filteredTimeboxes);
	};

	// Add Timebox
	const addTimebox = () => {
		if (timeboxes.length === 3) return;

		setTimeboxes([...timeboxes, timeboxes.slice(-1)[0] + 1]);
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

	const timeLeftDisplay = prettyTime(timeLeft);
	const timeTotalDisplay = prettyTime(choosenTime);

	// Audio

	const [audio, setAudio] = useState<null | HTMLAudioElement>(null);

	useEffect(() => {
		setAudio(new Audio());
	}, []);

	const playAudio = () => {
		if (audio == null) return;

		audio.play();
	};

	useEffect(() => {
		playAudio();
	}, [activeTimeboxId]);

	const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files == null) return;

		const reader = new FileReader();
		const file = e.target.files[0];

		reader.onload = (e) => {
			if (e.target == null) return;

			setAudio(new Audio(e.target.result as string));
		};

		reader.readAsDataURL(file);
	};

	return (
		<div className="min-h-screen flex-col items-center justify-center bg-kinoko-black">
			<Head>
				<title>Kinoko Timer</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="grid grid-cols-2 gap-2">
				<div className="white-card flex flex-col items-center justify-center">
					<TaskTitle />
					<h5>Total duration</h5>
					<h5>
						<span className="text-kinoko-purple">{timeLeftDisplay}</span>
						<span>/</span>
						<span>{timeTotalDisplay}</span>
					</h5>
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
				{/* Audio */}
				<div className="white-card">
					<input type="file" onChange={(e) => handleChangeFile(e)} />
					<PurpleButton clickEvent={playAudio}>Play Audio</PurpleButton>
				</div>
			</main>
		</div>
	);
};

export default Home;
