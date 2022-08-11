import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Timebox from "../components/Timebox";
import TimerContext from "./TimerContext";

const Home: NextPage = () => {
	const [activeTimebox, setActiveTimebox] = useState(1);
	const value = { activeTimebox, setActiveTimebox };

	return (
		<div className="min-h-screen flex-col items-center justify-center bg-kinoko-black">
			<Head>
				<title>Kinoko Timer</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex w-full h-[70vh] flex-col items-center justify-center px-20 space-y-5">
				<h2 className="text-white text-6xl">Timers</h2>
				<TimerContext.Provider value={value}>
					<Timebox id={1} />
					<Timebox id={2} />
					<Timebox id={3} />
				</TimerContext.Provider>
			</main>
		</div>
	);
};

export default Home;
