import { createContext } from "react";
import { TimerInfo } from "../Components/VegetableItem/VegetableItem";

const MainContext = createContext({
  eventEndTimer: new Event(""),
  updateTimerInfo: (arg: TimerInfo) => {},
  isPause: true,
  offset: 0,
  incOffset: () => {},
});

export default MainContext;
