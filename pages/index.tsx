import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import PurpleButton from "../components/PurpleButton";
import Timebox from "../components/Timebox";
import { prettyTime } from "../utils/prettyTime";
import useTimer from "../utils/useTimer";
import TimerContext from "./TimerContext";

// TODO: Settings for notifications etc
// TODO: add icons for edit and delete
// TODO: edit and delete forms and functionality
// TODO: Cool framermotion animations
// TODO: Don't allow less than 2 timeboxes
// TODO: Add default sizes for headers and clean up your css

const Home: NextPage = () => {
	const [activeTimeboxId, setActiveTimeboxId] = useState(0);
	const [activeTask, setActiveTask] = useState(false);
	const [choosenTime, setChoosenTime] = useState(30);
	const { startTimer, stopTimer, resetTimer, timeLeft } = useTimer(choosenTime);
	const timeboxes = [1, 2, 3];
	let lastTimeboxId = timeboxes.slice(-1)[0]; // ! Doesn't work properly, fix and make changes in Timebox.tsx

	// Context

	const value = {
		activeTimeboxId,
		setActiveTimeboxId,
		activeTask,
		lastTimeboxId,
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

	const addTimebox = () => {
		timeboxes.push(lastTimeboxId + 1);
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
					{/* Task */}
					<h2>Task</h2>
					<h3 className="text-kinoko-purple">Reading Japanese</h3>
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
					</div>
					<div className="mt-6">
						<h5>last timebox Id: {lastTimeboxId}</h5>
						<h5>active?: {activeTask ? "Yes" : "No"}</h5>
					</div>
				</div>
				{/* Timeboxes */}
				<div className="space-y-3">
					<h2 className="text-white text-6xl">Timers</h2>
					<TimerContext.Provider value={value}>
						{timeboxes.map((id) => (
							<Timebox id={id} key={id} />
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
