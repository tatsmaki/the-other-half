import { loadAudio, loadingManager } from "../../objects/global/loader";
import { GameScreen } from "../game/game";
import classes from "./loading.module.css";

export const LoadingScreen = () => {
  const app = document.getElementById("app")!;
  const screen = document.createElement("div");
  const title = document.createElement("h1");
  const ready = document.createElement("span");

  screen.className = classes.loading;
  app.append(screen);

  title.textContent = "Please wait";
  ready.textContent = "0 %";
  screen.append(title, ready);

  loadingManager.onProgress = (_url, loaded, total) => {
    const progress = (loaded / total) * 100;

    ready.textContent = `${progress.toFixed()} %`;
  };

  loadingManager.onLoad = () => {
    ready.textContent = "Click anywhere to continue";

    screen.onclick = () => {
      screen.remove();
      GameScreen();
    };
  };

  loadAudio();
};
