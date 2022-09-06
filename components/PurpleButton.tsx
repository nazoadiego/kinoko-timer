import { FC, MouseEventHandler } from "react";

interface PurpleButtonProps {
	clickEvent?: MouseEventHandler;
	children: string;
}

const PurpleButton: FC<PurpleButtonProps> = (props) => {
	const { clickEvent, children } = props;
	return (
		<button className="purple-btn" onClick={clickEvent}>
			{children}
		</button>
	);
};

export default PurpleButton;
