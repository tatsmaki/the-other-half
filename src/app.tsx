import { createSignal } from "solid-js";
import { LoadingScreen } from "./screens/loading";
import { GameScreen } from "./screens/game";
import { PauseScreen } from "./screens/pause";
import { SettingsScreen } from "./screens/settings";
import { MobileScreen } from "./screens/mobile";
import { gameControl } from "./controls/game";
import { audioControl } from "./controls/audio";

export const App = () => {
  const [isLoading, setIsLoading] = createSignal(true);
  const [isPause, setIsPause] = createSignal(false);
  const [isSettings, setIsSettings] = createSignal(false);

  const startGame = () => {
    setIsLoading(false);
  };

  const pauseGame = () => {
    setIsPause(true);
    gameControl.pauseGame();
    audioControl.stopBackground();
  };

  const resumeGame = () => {
    setIsPause(false);
  };

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
      {isLoading() && <LoadingScreen onLoad={startGame} />}
      {!isLoading() && <GameScreen onPause={pauseGame} />}

      {isPause() && <PauseScreen onResume={resumeGame} onSettings={openSettings} />}
      {isSettings() && <SettingsScreen onClose={closeSettings} />}

      <MobileScreen isLoading={isLoading} onPause={pauseGame} />
    </>
  );
};
