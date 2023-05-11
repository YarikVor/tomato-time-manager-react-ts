import { useContext, useEffect, useState } from "react";
import TimeBar from "../TimeBar/TimeBar";
import TimeSpan from "../../Methods/TimeSpan";
import { useIntervalIf } from "../../Methods/Methods";

import MainContext from "../../Contexts/MainContext";
import { TimerInfo } from "../VegetableItem/VegetableItem";

import styles from "./style.module.css";

type TitleBarProps = {
  timerInfo: TimerInfo;
  isActive: boolean;
};

export const TitleBar = (props: TitleBarProps) => {
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    setEndTime(
      TimeSpan.AddDateAndTimeSpan(
        props.timerInfo.startTimer,
        TimeSpan.createFromSeconds(props.timerInfo.delay)
      )
    );
  }, [props.timerInfo.startTimer, props.timerInfo.delay]);

  const mainContext = useContext(MainContext);

  useIntervalIf(
    () => {
      setProgressBarValue(
        TimeSpan.DiffDates(new Date(), props.timerInfo.startTimer) /
          (props.timerInfo.delay * 1000)
      );
      const diff = TimeSpan.DiffDates(endTime, new Date());
      if (diff <= 0) {
        document.dispatchEvent(mainContext.eventEndTimer);
      }
      console.log("Update timer");
    },
    1000,
    props.isActive
  );

  const [progressBarValue, setProgressBarValue] = useState(0);

  const timeSpan = TimeSpan.createFromMs(
    props.timerInfo.delay * 1000 -
      TimeSpan.DiffDates(new Date(), props.timerInfo.startTimer),
    true
  );

  return (
    <>
      <div className={styles.mainStyle}>
        <div className={styles.titleStyle}>
          <div className={styles.iconStyle}>{props.timerInfo.icon}</div>
          <div className={styles.timerStyle}>{timeSpan.toString()}</div>
        </div>
        <TimeBar value={progressBarValue} />
        <div className={styles.subtitleStyle}>
          <span>{props.timerInfo.startTimer.toLocaleTimeString()}</span>
          <b>{new Date().toLocaleTimeString()}</b>
          <span>{endTime.toLocaleTimeString()}</span>
        </div>
      </div>
    </>
  );
};
