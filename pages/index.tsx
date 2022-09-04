import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import PurpleButton from "../components/PurpleButton";
import Task from "../components/Task";
import useAudio from "../utils/hooks/useAudio";

const Home: NextPage = () => {
	const { playAudio, handleChangeFile } = useAudio();

	return (
		<div className="min-h-screen flex-col items-center justify-center bg-kinoko-black">
			<Head>
				<title>Kinoko Timer</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Task playAudio={playAudio} />
			{/* Audio - Settings */}
			<div className="white-card mt-5 py-4 px-8 w-1/3">
				<input type="file" onChange={(e) => handleChangeFile(e)} />
				<PurpleButton clickEvent={playAudio}>Play Audio</PurpleButton>
			</div>
		</div>
	);
};

export default Home;
