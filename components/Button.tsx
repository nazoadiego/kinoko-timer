import { FC, MouseEventHandler } from "react";

interface PurpleButtonProps {
	clickEvent: MouseEventHandler;
	children: string;
}

const PurpleButton: FC<PurpleButtonProps> = (props) => {
	const { clickEvent, children } = props;
	return (
		<button
			className="px-4 py-2 bg-kinoko-purple text-white rounded-lg hover:translate-y-0.5 transition ease-in"
			onClick={clickEvent}
		>
			{children}
		</button>
	);
};

export default PurpleButton;
