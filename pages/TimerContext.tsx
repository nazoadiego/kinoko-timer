import { createContext } from "react";

const TimerContext: any = createContext({
	activeTimebox: 1,
	setActiveTimebox: () => {},
	activeTask: false,
	timeboxes: [1, 2, 3],
});

export default TimerContext;
