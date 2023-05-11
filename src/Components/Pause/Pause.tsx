import React from "react";
import "./Pause.css";

type PauseProps = {
  children?: React.ReactNode;
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
};

const Pause = (props: PauseProps) => {
  const classes = ["pause"];

  if (!props.isVisible) {
    classes.push("hidden");
  }

  const classesJoin = classes.join(" ");

  return (
    <div className={classesJoin} onClick={() => props.setVisible(false)}>
      {props.children}
    </div>
  );
};

export default Pause;
