import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TitleBar } from "../TitleBar/TitleBar";
import VegetableList, { generateList } from "../VegetableList/VegetableList";
import Pause from "../Pause/Pause";
import TimeSpan from "../../Methods/TimeSpan";
import { VegetableItemProps } from "../VegetableItem/VegetableItem";
import { setTitleIconString } from "../../Methods/Methods";
import "../../Contexts/MainContext";
import MainContext from "../../Contexts/MainContext";
import SettingsContext from "../../Contexts/SettingsContext";
import AudioPlayer from "../SoundPlayer/TimerPlay";
import styles from "./style.module.css";
import Settings from "../Settings/Settings";

const Main = () => {
  const settingsContext = useContext(SettingsContext);
  const [event] = useState(new Event("endTimer"));
  const [heightStyles, setHeightStyles] = useState({ height: 0 });
  const mainChild: React.RefObject<HTMLDivElement> = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (mainChild.current) {
      setHeightStyles({ height: mainChild.current.scrollHeight });
      console.log("Height update");
    }
  }, [mainChild.current?.scrollHeight]);
  const [timerInfo, setTimerInfo] = useState({
    icon: "⏸",
    startTimer: new Date(),
    delay: 5,
  });
  const [pause, setPause] = useState(true);

  useEffect(() => {
    const endTimerFun = () => {
      settingsContext.isSound && AudioPlayer.PlayTimer();
      console.log("Active audio 'Timer'");
    };

    document.addEventListener("endTimer", endTimerFun);
    console.log("Call make");

    return () => {
      document.removeEventListener("endTimer", endTimerFun);
    };
  }, [settingsContext.isSound]);

  const [diffFromStartToNow, setDiffFromStartToNow] = useState(0);
  const updatePause = (isPause: boolean) => {
    if (isPause) {
      const diff = TimeSpan.DiffDates(new Date(), timerInfo.startTimer);
      setDiffFromStartToNow(diff);
    } else {
      const startDate = TimeSpan.DiffDateAndTimeSpan(
        new Date(),
        TimeSpan.createFromMs(diffFromStartToNow, true),
        false
      );
      setTimerInfo({
        ...timerInfo,
        startTimer: startDate,
      });
    }
    setPause(isPause);
  };

  const incOffset = useCallback(() => {
    setOffset((prevOffset) => {
      const nextOffset = (prevOffset + 1) % (settingsContext.countTomato * 2);

      console.log("offset: " + prevOffset, "nextOffset: " + nextOffset);

      const listIterator = generateList(
        new Date(),
        settingsContext,
        nextOffset
      );

      const currentTimerInfo = listIterator.next().value as VegetableItemProps;

      setTimerInfo({
        icon: currentTimerInfo.Icon,
        delay: currentTimerInfo.Time.allSeconds,
        startTimer: currentTimerInfo.StartTime,
      });

      setTitleIconString(currentTimerInfo.Icon);

      return nextOffset;
    });
  }, [settingsContext]);

  const [settingsPause, setSettingsPause] = useState(true);

  return (
    <>
      <Pause isVisible={pause} setVisible={updatePause}>
        Pause <br /> Press any key or tap...
      </Pause>
      {settingsPause && (
        <Pause isVisible={true} setVisible={setSettingsPause}>
          <div style={{ color: "black" }} onClick={(e) => e.stopPropagation()}>
            <Settings />
          </div>
        </Pause>
      )}
      <MainContext.Provider
        value={{
          eventEndTimer: event,
          updateTimerInfo: setTimerInfo,
          isPause: pause,
          offset: offset,
          incOffset: incOffset,
        }}
      >
        <div className={styles.main}>
          <div className={styles.subMain}>
            <div className={styles.subSubMain} style={heightStyles}>
              <div className={styles.title} ref={mainChild}>
                <TitleBar timerInfo={timerInfo} isActive={!pause} />
                <button onClick={() => updatePause(true)}>Pause ⏸</button>
                <button onClick={() => incOffset()}>Next ⏭</button>
                <button onClick={() => setSettingsPause(true)}>
                  Settings ⚙️
                </button>
              </div>
              <div className={styles.list}>
                <VegetableList timerInfo={timerInfo} />
              </div>
            </div>
          </div>
        </div>
      </MainContext.Provider>
    </>
  );
};

export default Main;
