import { gameControl } from "../../controls/game";
import classes from "./pause.module.css";

type CreateActionArgs = {
  title: string;
  disabled?: boolean;
  onclick?(): void;
};

const createAction = ({ title, disabled = false, onclick = () => {} }: CreateActionArgs) => {
  const action = document.createElement("button");

  action.role = "menuitem";
  action.className = classes.action;
  action.textContent = title;
  action.disabled = disabled;

  action.onclick = onclick;

  return action;
};

export const PauseScreen = () => {
  const screen = document.createElement("div");

  screen.className = classes.pause;
  screen.role = "menu";

  const removeScreen = () => {
    screen.remove();
    document.removeEventListener("keydown", handleKeydown);
  };

  screen.append(
    createAction({
      title: "resume",
      onclick() {
        removeScreen();
        gameControl.resumeGame();
      },
    }),
    createAction({
      title: "settings",
      disabled: true,
    })
  );

  document.body.append(screen);

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      removeScreen();
      gameControl.resumeGame();
    }
  };

  document.addEventListener("keydown", handleKeydown);
};
