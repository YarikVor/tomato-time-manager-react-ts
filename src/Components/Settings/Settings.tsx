import TimeSpan from "../../Methods/TimeSpan";
import { ActionT } from "../../Methods/Methods";
import { useContext, useEffect, useState } from "react";
import SettingsContext from "../../Contexts/SettingsContext";
import styles from "./style.module.css";
import { saveSettings } from "../../Methods/LoaderStorage";

const Settings = () => {
  const settingsContext = useContext(SettingsContext);

  useEffect(() => {
    return () => {
      console.log(settingsContext);
      saveSettings(settingsContext);
    };
  }, [settingsContext]);

  console.log(settingsContext);

  return (
    <div className={styles.main}>
      <h2>Settings</h2>
      <h3>Time</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <SettingRow
              key={0}
              title={"Tomato"}
              time={settingsContext.vegetables.tomato.delay}
              icon={settingsContext.vegetables.tomato.icon}
              onChangeIcon={(s) => {
                const vegetables = settingsContext.vegetables;
                vegetables.tomato.icon = s;
                settingsContext.updateSettings({
                  ...settingsContext,
                  vegetables: vegetables,
                });
              }}
              onChangeTime={(ts) => {
                const vegetables = settingsContext.vegetables;
                vegetables.tomato.delay = ts;
                settingsContext.updateSettings({
                  ...settingsContext,
                  vegetables: vegetables,
                });
              }}
            />
          </tr>
          <tr>
            <SettingRow
              key={1}
              title={"Cucumber"}
              time={settingsContext.vegetables.cucumber.delay}
              icon={settingsContext.vegetables.cucumber.icon}
              onChangeIcon={(s) => {
                const vegetables = settingsContext.vegetables;
                vegetables.cucumber.icon = s;
                settingsContext.updateSettings({
                  ...settingsContext,
                  vegetables: vegetables,
                });
              }}
              onChangeTime={(ts) => {
                const vegetables = settingsContext.vegetables;
                vegetables.cucumber.delay = ts;
                settingsContext.updateSettings({
                  ...settingsContext,
                  vegetables: vegetables,
                });
              }}
            />
          </tr>
          <tr>
            <SettingRow
              key={2}
              title={"Grape"}
              time={settingsContext.vegetables.grape.delay}
              icon={settingsContext.vegetables.grape.icon}
              onChangeIcon={(s) => {
                const vegetables = settingsContext.vegetables;
                vegetables.grape.icon = s;
                settingsContext.updateSettings({
                  ...settingsContext,
                  vegetables: vegetables,
                });
              }}
              onChangeTime={(ts) => {
                const vegetables = settingsContext.vegetables;
                vegetables.grape.delay = ts;
                settingsContext.updateSettings({
                  ...settingsContext,
                  vegetables: vegetables,
                });
              }}
            />
          </tr>
        </tbody>
      </table>
      <h3>Other</h3>
      <table>
        <tr>
          <td>Sound</td>
          <td>
            <input
              type={"checkbox"}
              checked={settingsContext.isSound}
              onChange={(e) => {
                settingsContext.updateSettings({
                  ...settingsContext,
                  isSound: e.target.checked,
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td>Count next vegetables</td>
          <td>
            <input
              type={"number"}
              value={settingsContext.countNextVegetables}
              onChange={(e) => {
                settingsContext.updateSettings({
                  ...settingsContext,
                  countNextVegetables: e.target.valueAsNumber,
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td>Count tomatoes</td>
          <td>
            <input
              min={1}
              value={settingsContext.countTomato}
              type={"number"}
              onChange={(e) => {
                settingsContext.updateSettings({
                  ...settingsContext,
                  countTomato: e.target.valueAsNumber,
                });
              }}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Settings;

type SettingRowProps = {
  title: string;
  icon: string;
  time: TimeSpan;
  onChangeTime: ActionT<TimeSpan>;
  onChangeIcon: ActionT<string>;
};

const SettingRow = (props: SettingRowProps) => {
  const [time, setTime] = useState(props.time);
  const [icon, setIcon] = useState(props.icon);
  console.log("Update settings");

  const updateTime = (arg: TimeSpan) => {
    setTime(arg);
    props.onChangeTime(arg);
  };

  const updateIcon = (arg: string) => {
    setIcon(arg);
    props.onChangeIcon(arg);
  };

  console.log(time.toTimeString());

  return (
    <>
      <td>{props.title}</td>
      <td>
        <input
          value={time.toTimeString()}
          type={"time"}
          onChange={(e) =>
            updateTime(TimeSpan.createFromMs(e.target.valueAsNumber, true))
          }
          step={1}
          style={{
            fontSize: "1.5em",
          }}
        />
      </td>
      <td>
        <input
          value={icon}
          type={"text"}
          minLength={2}
          maxLength={2}
          onChange={(e) => updateIcon(e.target.value)}
        />
      </td>
    </>
  );
};
