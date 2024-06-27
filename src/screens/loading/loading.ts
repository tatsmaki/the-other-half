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

  setTimeout(() => {
    const ready = document.createElement("span");
    ready.textContent = "Click anywhere to continue";
    screen.append(ready);

    screen.onclick = () => {
      screen.remove();
      GameScreen();
    };
  }, 1000);
};
