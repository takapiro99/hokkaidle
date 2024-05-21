import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Game } from "./components/Game";
import React, { useEffect, useState } from "react";
import { Infos } from "./components/panels/Infos";
import { Settings } from "./components/panels/Settings";
import { useSettings } from "./hooks/useSettings";
import { Hokkaidle } from "./components/Hokkaidle";

function App() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [settingsData, updateSettings] = useSettings();

  useEffect(() => {
    if (settingsData.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settingsData.theme]);

  return (
    <>
      <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        theme={settingsData.theme}
        autoClose={2000}
        bodyClassName="font-bold text-center"
      />
      <Infos
        isOpen={infoOpen}
        close={() => setInfoOpen(false)}
        settingsData={settingsData}
      />
      <Settings
        isOpen={settingsOpen}
        close={() => setSettingsOpen(false)}
        settingsData={settingsData}
        updateSettings={updateSettings}
      />
      <div className="flex justify-center flex-auto dark:bg-slate-900 dark:text-slate-50">
        <div className="w-full max-w-lg flex flex-col">
          <header className="border-b-2 border-gray-200 flex">
            <button
              className="mx-3 text-xl"
              type="button"
              onClick={() => setInfoOpen(true)}
            >
              ❓
            </button>
            <h1 className="text-4xl font-bold tracking-wide text-center my-1 flex-auto">
              HOKKAI<span className="text-green-600">D</span>LE
              <img
                src="hokkaido.png"
                alt="Hokkaido"
                style={{
                  height: "33px",
                  display: "inline",
                  marginBottom: "8px",
                  marginLeft: "6px",
                }}
              />
            </h1>
            <button
              className="mx-3 text-xl"
              type="button"
              onClick={() => setSettingsOpen(true)}
            >
              ⚙️
            </button>
          </header>
          <Game settingsData={settingsData} />
          <footer className="flex justify-center text-sm mt-8 mb-1">
            {/* ❤️ <Worldle />? - */}
            <Hokkaidle />
            {/* <a
              className="underline pl-1"
              href="https://www.ko-fi.com/teuteuf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("buyMeACoffee")}
            </a> */}
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
