import { audioControl } from "../../controls/audio";
import { gameControl } from "../../controls/game";
import { audioResources } from "../../objects/global/loader";
import { Action } from "../../ui/action";
import { onKeyDown } from "../../utils/on_key_down";
import { SettingsScreen } from "../settings/settings";
import classes from "./pause.module.css";

export const PauseScreen = () => {
  const screen = document.createElement("div");

  screen.className = classes.pause;
  screen.role = "menu";

  const resumeGame = () => {
    removeScreen();
    audioControl.playBackground(audioResources.get("blizzard.wav")!);
    gameControl.resumeGame();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      resumeGame();
    }
  };

  const unsubscribe = onKeyDown(handleKeydown);

  const removeScreen = () => {
    screen.remove();
    unsubscribe();
  };

  screen.append(
    Action({
      title: "resume",
      onclick() {
        resumeGame();
      },
    }),
    Action({
      title: "settings",
      onclick() {
        removeScreen();
        SettingsScreen();
      },
    })
  );

  document.body.append(screen);
};
