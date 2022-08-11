import { createContext } from "react";

const TimerContext: any = createContext({
	activeTimebox: 1,
	setActiveTimebox: () => {},
});

export default TimerContext;
