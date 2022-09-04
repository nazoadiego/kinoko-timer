import { ChangeEvent, useEffect, useState } from "react";

const useAudio = () => {
	const [audio, setAudio] = useState<null | HTMLAudioElement>(null);

	const playAudio = () => {
		if (audio == null) return;

		audio.play();
	};

	useEffect(() => {
		setAudio(new Audio());
	}, []);

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

	return { playAudio, handleChangeFile };
};

export default useAudio;
