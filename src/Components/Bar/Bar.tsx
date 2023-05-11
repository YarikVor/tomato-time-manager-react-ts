import React, { CSSProperties } from "react";
import styles from "./style.module.css";

const Bar = (props: BarProps) => {
  const barStyle: CSSProperties | BarBackgroundCSSProps = {
    ...props.style,
    background: props.background,
  };

  const foregroundStyle: CSSProperties | BarForegroundStyle = {
    background: props.foreground,
    width: `${props.value * 100}%`,
  };

  return (
    <div className={styles.bar} style={barStyle}>
      <div className={styles.barForeground} style={foregroundStyle}></div>
    </div>
  );
};

type BarProps = {
  background: string;
  foreground: string;
  value: number;
  style?: CSSProperties;
};

type BarBackgroundCSSProps = {
  background: string;
};

type BarForegroundStyle = {
  background: string;
  width: string;
};

export default Bar;
