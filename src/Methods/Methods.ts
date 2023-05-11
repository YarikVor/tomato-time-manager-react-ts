import React, { useEffect } from "react";

export default function toArray<T>(
  yieldObj: Iterator<T>,
  count: number = Number.MAX_SAFE_INTEGER
): T[] {
  let resArray: T[] = [];
  let iterator = yieldObj.next();

  while (!iterator.done && count > 0) {
    resArray.push(iterator.value);
    iterator = yieldObj.next();
    count--;
  }

  return resArray;
}

/*
* useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setProgressBarValue(
        (Date.now() - props.timerInfo.startTimer.getTime()) /
          (props.timerInfo.delay * 1000)
      );

      return () => clearInterval(interval);
    }, 1000);
  }, []);
* */

export const useInterval = (
  action: () => void,
  ms: number,
  cleanup?: React.EffectCallback,
  deps?: React.DependencyList | undefined
) => {
  useEffect(() => {
    const interval = setInterval(action, ms);

    return () => {
      clearInterval(interval);
      cleanup?.();
    };
  }, deps);
};

export const useIntervalIf = (
  action: () => void,
  ms: number,
  expretion: boolean,
  cleanup?: React.EffectCallback,
  deps?: React.DependencyList | undefined
) => {
  useEffect(() => {
    const interval = setInterval(() => expretion && action(), ms);

    return () => {
      clearInterval(interval);
      cleanup?.();
    };
  }, deps);
};

export const setTitleIconString = (icon: string) => {
  document.title = icon.repeat(3);
  console.log("Change icons in document title");
};

export const ActionEmpty = () => {};
export const ActionTEmpty = <T>(arg: T) => {};

export type Action = () => void;
export type ActionT<T> = (arg: T) => void;
export type ActionT2<T1, T2> = (arg1: T1, arg2: T2) => void;
