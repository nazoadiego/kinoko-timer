import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import PurpleButton from "../components/PurpleButton";
import Task from "../components/Task";
import useAudio from "../utils/hooks/useAudio";

const Home: NextPage = () => {
	const { playAudio, handleChangeFile } = useAudio();

	return (
		<div className=" bg-kinoko-black">
			<Head>
				<title>Kinoko Timer</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="min-h-screen flex items-center gap-10 mx-6">
				<div className="white-card w-3/4 py-8 px-8 mt-5 basis-1/6">
					<h2>Tasks</h2>
				</div>
				<div className="mt-5 basis-4/6">
					<Task playAudio={playAudio} />
				</div>
				{/* Audio - Settings */}
				<div className="white-card w-3/4 mt-5 py-8 px-8 basis-1/6">
					<input type="file" onChange={(e) => handleChangeFile(e)} />
					<PurpleButton clickEvent={playAudio}>Play Audio</PurpleButton>
				</div>
			</main>
		</div>
	);
};

export default Home;
