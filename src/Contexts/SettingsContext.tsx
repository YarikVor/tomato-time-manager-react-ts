import { createContext } from "react";
import { VegetableInfo } from "../Components/VegetableList/VegetableList";
import TimeSpan from "../Methods/TimeSpan";
import { ActionT, ActionTEmpty } from "../Methods/Methods";

const SettingsContext = createContext({
  countTomato: 0,
  updateCountTomato: ActionTEmpty<number>,
  vegetables: {
    tomato: {
      icon: "🍅",
      delay: TimeSpan.createFromMinutes(25),
    } as VegetableInfo,
    cucumber: {
      icon: "🥒",
      delay: TimeSpan.createFromMinutes(5),
    } as VegetableInfo,
    grape: {
      icon: "🍇",
      delay: TimeSpan.createFromMinutes(10),
    } as VegetableInfo,
  } as VegetableSettings,
  updateVegetables: ActionTEmpty<VegetableSettings>,
} as SettingsContextType);

export type SettingsContextType = SettingsContextTypeT<VegetableInfo> & {
  updateSettings: ActionT<SettingsContextType>;
};

export type SettingsContextJsonParse =
  SettingsContextTypeT<VegetableInfoJsonParse>;

export type SettingsContextTypeT<T> = WriteOnlySettingsContextTypeT<T> &
  ReadOnlySettingsContextTypeT<T>;

export type ReadOnlySettingsContextType =
  ReadOnlySettingsContextTypeT<VegetableInfo>;

export type ReadOnlySettingsContextTypeT<T> = {
  countTomato: number;
  vegetables: VegetableSettingsT<T>;
  isSound: boolean;
  countNextVegetables: number;
};

export type TimeSpanType = {
  get _ticks(): number;
};

export type VegetableInfoT<T> = {
  icon: string;
  delay: T;
};

export type VegetableSettingsT<T> = {
  tomato: T;
  cucumber: T;
  grape: T;
};

export type WriteOnlySettingsContextTypeT<T> = {
  updateCountTomato: ActionT<number>;
  updateVegetables: ActionT<VegetableSettingsT<T>>;
};

export type ReadOnlySettingsContextTypeJsonParse =
  ReadOnlySettingsContextTypeT<TimeSpanType>;

export type VegetableSettings = VegetableSettingsT<VegetableInfo>;

export type VegetableInfoJsonParse = VegetableInfoT<TimeSpanType>;

export default SettingsContext;
