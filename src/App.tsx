import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import SettingsContext, { VegetableSettings } from "./Contexts/SettingsContext";
import { loadSettings } from "./Methods/LoaderStorage";
import { ActionTEmpty } from "./Methods/Methods";

function App() {
  const [settings, setSettings] = useState(loadSettings());

  console.log(settings);
  return (
    <>
      <Header />
      <SettingsContext.Provider
        value={{
          countTomato: settings.countTomato,
          vegetables: settings.vegetables,
          updateCountTomato: ActionTEmpty<number>,
          updateVegetables: ActionTEmpty<VegetableSettings>,
          isSound: settings.isSound,
          countNextVegetables: settings.countNextVegetables,
          updateSettings: setSettings,
        }}
      >
        <Main />
      </SettingsContext.Provider>
    </>
  );
}

export default App;
