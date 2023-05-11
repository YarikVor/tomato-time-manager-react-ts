import TimeSpan from "../../Methods/TimeSpan";
import styles from "./style.module.css";

export type VegetableItemProps = {
  Time: TimeSpan;
  StartTime: Date;
  Icon: string;
};

const VegetableItem = (props: VegetableItemProps) => {
  const endTime = TimeSpan.AddDateAndTimeSpan(props.StartTime, props.Time);

  return (
    <div className={styles.vegetableItemStyle}>
      <div className={styles.iconStyle}>{props.Icon}</div>
      <div className={styles.timeBoxStyle}>
        <div className={styles.titleStyle}>{props.Time.toString()}</div>
        <div className={styles.subtitleStyle}>
          <span>{props.StartTime.toLocaleTimeString()}</span>
          &nbsp;-&nbsp;
          <span>{endTime.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export type TimerInfo = {
  icon: string;
  startTimer: Date;
  delay: number;
};

export default VegetableItem;
