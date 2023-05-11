import toArray from "../../Methods/Methods";
import VegetableItem, {
  TimerInfo,
  VegetableItemProps,
} from "../VegetableItem/VegetableItem";
import TimeSpan from "../../Methods/TimeSpan";
import { useContext, useEffect } from "react";
import MainContext from "../../Contexts/MainContext";
import SettingsContext, {
  ReadOnlySettingsContextType,
  VegetableInfoT,
} from "../../Contexts/SettingsContext";

type VegetableListProps = {
  style?: React.CSSProperties;
  timerInfo: TimerInfo;
};

const VegetableList = (props: VegetableListProps) => {
  const mainContext = useContext(MainContext);
  const settingsContext = useContext(SettingsContext);

  const listIterator = generateList(
    props.timerInfo.startTimer,
    settingsContext,
    mainContext.offset
  );

  const array = toArray(listIterator, settingsContext.countNextVegetables);

  useEffect(() => {
    const fun = () => {
      const firstElem = array[0];

      mainContext.updateTimerInfo({
        startTimer: new Date(),
        delay: firstElem.Time.floorAllSeconds,
        icon: firstElem.Icon,
      });

      mainContext.incOffset();

      console.log("Change elements in 'VegetableList'");
    };

    document.addEventListener("endTimer", fun);

    return () => document.removeEventListener("endTimer", fun);
  }, []);

  return (
    <div style={props.style}>
      {array.map((v, i) => {
        return <VegetableItem key={mainContext.offset + i} {...v} />;
      })}
    </div>
  );
};

export function* generateList(
  dateStart: Date,
  settingContext: ReadOnlySettingsContextType,
  offset: number
) {
  let origin: VegetableItemProps = {
    Icon: "🙋‍♂️",
    StartTime: dateStart,
    Time: TimeSpan.Zero,
  };

  let iconIterator = generateIcons(settingContext, offset);

  for (let i = 0; i < 999; i++) {
    const vegetableInfo = iconIterator.next().value as VegetableInfo;

    yield {
      Icon: vegetableInfo.icon,
      StartTime: origin.StartTime,
      Time: vegetableInfo.delay,
    } as VegetableItemProps;

    origin.StartTime = TimeSpan.AddDateAndTimeSpan(
      origin.StartTime,
      vegetableInfo.delay
    );
  }
  throw new Error("Iterator is infinity");
}

function* generateIcons(
  settingContext: ReadOnlySettingsContextType,
  offset: number
) {
  let x = offset % (settingContext.countTomato * 2);
  while (true) {
    if (settingContext.countTomato * 2 - 1 === x) {
      yield settingContext.vegetables.grape;
      x = -1;
    } else if ((x & 1) === 0) {
      yield settingContext.vegetables.tomato;
    } else {
      yield settingContext.vegetables.cucumber;
    }
    x++;
  }
}

export default VegetableList;

export type VegetableInfo = VegetableInfoT<TimeSpan>;
