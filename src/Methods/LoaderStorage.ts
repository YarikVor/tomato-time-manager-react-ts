import {
  ReadOnlySettingsContextType,
  SettingsContextJsonParse,
} from "../Contexts/SettingsContext";
import TimeSpan from "./TimeSpan";

const SETTING_PROPERTY_NAME = "settings";

export const loadSettings = (): ReadOnlySettingsContextType => {
  const loadData: SettingsContextJsonParse | null = JSON.parse(
    localStorage.getItem(SETTING_PROPERTY_NAME) ?? "null"
  );

  if (loadData == null) {
    console.log("Load default data");
    return {
      vegetables: {
        grape: {
          icon: "🍇",
          delay: TimeSpan.createFromMinutes(20),
        },
        cucumber: {
          icon: "🥒",
          delay: TimeSpan.createFromSeconds(5),
        },
        tomato: {
          icon: "🍅",
          delay: TimeSpan.createFromSeconds(25),
        },
      },
      countTomato: 4,
      countNextVegetables: 4,
      isSound: false,
    };
  }

  console.log("Load custom data");

  return toSettingContextType(loadData);
};

const toSettingContextType = (
  arg: SettingsContextJsonParse
): ReadOnlySettingsContextType => {
  let res = arg as unknown as ReadOnlySettingsContextType;

  res.vegetables.cucumber.delay = new TimeSpan(
    arg.vegetables.cucumber.delay._ticks
  );
  res.vegetables.tomato.delay = new TimeSpan(
    arg.vegetables.tomato.delay._ticks
  );
  res.vegetables.grape.delay = new TimeSpan(arg.vegetables.tomato.delay._ticks);

  return res;
};

export const saveSettings = (value: ReadOnlySettingsContextType) => {
  console.log("Save data");
  localStorage.setItem(SETTING_PROPERTY_NAME, JSON.stringify(value));
};
