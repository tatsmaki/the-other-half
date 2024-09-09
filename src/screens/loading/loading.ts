import { loadAudio, loadingManager } from "../../objects/global/loader";
import { GameScreen } from "../game/game";
import classes from "./loading.module.css";

export const LoadingScreen = () => {
  const app = document.getElementById("app")!;

  const screen = document.createElement("div");
  screen.className = classes.loading;
  app.append(screen);

  const title = document.createElement("h1");
  title.textContent = "Please wait";
  screen.append(title);

  // loadingManager.onProgress = (_url, loaded, total) => {
  //   console.log(loaded, total);
  // };

  loadingManager.onLoad = () => {
    const ready = document.createElement("span");
    ready.textContent = "Click anywhere to continue";
    screen.append(ready);

    screen.onclick = () => {
      screen.remove();
      GameScreen();
    };
  };

  loadAudio();
};
