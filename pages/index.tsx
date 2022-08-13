import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Timebox from "../components/Timebox";
import useTimer from "../utils/useTimer";
import TimerContext from "./TimerContext";

// TODO: Add custom audio for switches between timeboxes
// TODO: Settings for notifications etc
// TODO: Set task time
// TODO: Set timebox duration
// TODO: add icons for edit and delete
// TODO: edit and delete forms and functionality
// TODO: Cool framermotion animations
// TODO: Change the variable name 'value' to something clearer. It's being used to be passed down to our context

const Home: NextPage = () => {
	const [activeTimeboxId, setActiveTimeboxId] = useState(0);
	const value = { activeTimeboxId, setActiveTimeboxId };
	const [choosenTime, setChoosenTime] = useState(60);
	const { startTimer, stopTimer, resetTimer, timeLeft } = useTimer(choosenTime);

	const startTask = () => {
		setActiveTimeboxId(1);
		startTimer();
	};

	const formatTime = (number: number) => {
		return number.toString().padStart(2, "0");
	};

	const minutes = formatTime(Math.floor(choosenTime / 60));
	const seconds = formatTime(choosenTime - Number(minutes) * 60);
	const minutesLeft = formatTime(Math.floor(timeLeft / 60));
	const secondsLeft = formatTime(timeLeft - Number(minutesLeft) * 60);

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
						<span className="text-kinoko-purple">
							{minutesLeft}:{secondsLeft}
						</span>
						<span>/</span>
						<span>
							{minutes}:{seconds}
						</span>
					</h5>
					<button
						className="mt-10 px-4 py-2 bg-kinoko-purple text-white rounded-lg hover:translate-y-0.5 transition ease-in"
						onClick={startTask}
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
