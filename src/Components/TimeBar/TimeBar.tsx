import Bar from "../Bar/Bar";

type TimeBar = {
  value: number;
};

const TimeBar = (props: TimeBar) => {
  return (
    <Bar
      value={props.value}
      background="#A82315"
      foreground="#F97344"
      style={{
        borderRadius: 4,
        width: "100%",
        height: 27,
      }}
    />
  );
};

export default TimeBar;
