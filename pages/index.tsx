import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import Timebox from "../components/Timebox";
import TimerContext from "./TimerContext";

// TODO: Add custom audio for switches between timeboxes
// TODO: Settings for notifications etc
// TODO: Set task time
// TODO: Set timebox duration
// TODO: add icons for edit and delete
// TODO: edit and delete functionality
// TODO: custom useTimer hook7
// TODO: Cool framermotion animations

const Home: NextPage = () => {
	const [activeTimeboxId, setActiveTimeboxId] = useState(1);
	const [timeLeft, setTimeLeft] = useState(59);
	const value = { activeTimeboxId, setActiveTimeboxId };

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

	// TODO: Stop all timeboxes when tasks reaches 0
	const stopTimer = () => {
		clearInterval(intervalRef.current);
		intervalRef.current = null;
	};

	const resetTimer = () => {
		setTimeLeft(60);
	};

	return (
		<div className="min-h-screen flex-col items-center justify-center bg-kinoko-black">
			<Head>
				<title>Kinoko Timer</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="grid grid-cols-2 gap-2">
				<div className="bg-white rounded-lg flex flex-col items-center justify-center">
					<h2 className="text-4xl">Task</h2>
					<h3 className="text-3xl text-kinoko-purple">Reading Japanese</h3>
					<h5 className="text-xl">Total duration</h5>
					<h5 className="texl-lg">
						<span className="text-kinoko-purple">00:{timeLeft}</span>
						<span>/</span>
						<span>25:00</span>
					</h5>
					<button
						className="mt-10 px-4 py-2 bg-kinoko-purple text-white rounded-lg hover:translate-y-0.5 transition ease-in"
						onClick={startTimer}
					>
						Start Timer
					</button>
					<button
						className="mt-10 px-4 py-2 bg-kinoko-purple text-white rounded-lg hover:translate-y-0.5 transition ease-in"
						onClick={stopTimer}
					>
						Stop Timer
					</button>
					<button
						className="mt-10 px-4 py-2 bg-kinoko-purple text-white rounded-lg hover:translate-y-0.5 transition ease-in"
						onClick={resetTimer}
					>
						Reset Timer
					</button>
				</div>
				<div className="space-y-3">
					<h2 className="text-white text-6xl">Timers</h2>
					<TimerContext.Provider value={value}>
						<Timebox id={1} />
						<Timebox id={2} />
						<Timebox id={3} />
					</TimerContext.Provider>
				</div>
			</main>
		</div>
	);
};

export default Home;
