import { createSignal } from "solid-js";
import { LoadingScreen } from "./screens/loading";
import { GameScreen } from "./screens/game";
import { PauseScreen } from "./screens/pause";
import { SettingsScreen } from "./screens/settings";
import { MobileScreen } from "./screens/mobile";

export const App = () => {
  const [isLoading, setIsLoading] = createSignal(true);
  const [isPause, setIsPause] = createSignal(false);
  const [isSettings, setIsSettings] = createSignal(false);

  const closeSettings = () => {
    setIsSettings(false);
    setIsPause(true);
  };

  const openSettings = () => {
    setIsSettings(true);
    setIsPause(false);
  };

  return (
    <>
      {isLoading() && <LoadingScreen onLoad={() => setIsLoading(false)} />}
      {!isLoading() && <GameScreen onPause={() => setIsPause(true)} />}

      {isPause() && <PauseScreen onResume={() => setIsPause(false)} onSettings={openSettings} />}
      {isSettings() && <SettingsScreen onClose={closeSettings} />}

      <MobileScreen isLoading={isLoading} />
    </>
  );
};
