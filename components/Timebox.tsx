import { FC, useContext } from "react";
import TimerContext from "../pages/TimerContext";

interface TimeboxProps {
	id: number;
}

const Timebox: FC<TimeboxProps> = (props) => {
	const { id } = props;
	const { activeTimebox, setActiveTimebox } = useContext(TimerContext);

	const switchToNext = () => {
		console.log(activeTimebox);
		if (activeTimebox === 3) {
			setActiveTimebox(1);
		} else {
			setActiveTimebox((prevValue: number) => prevValue + 1);
		}
	};

	return (
		<div className="bg-white px-6 py-2 rounded-lg">
			<h3 className="text-black ">Timebox</h3>
			<div className="justify-end">
				<span className="text-kinoko-purple">10:00</span>
				<span>/</span>
				<span>25:00</span>
				<h5>Id: {id}</h5>
				<h3>{}</h3>
				<h5>active? {activeTimebox === id ? "Yes" : "No"}</h5>
				<button onClick={switchToNext}>Next</button>
			</div>
		</div>
	);
};

export default Timebox;
