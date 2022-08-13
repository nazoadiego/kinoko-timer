import { createContext } from "react";

const TimerContext: any = createContext({
	activeTimebox: 1,
	setActiveTimebox: () => {},
	activeTask: false,
});

export default TimerContext;
