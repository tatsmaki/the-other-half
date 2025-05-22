import { createEffect, onCleanup } from "solid-js";
import { audioControl } from "../../controls/audio";
import { gameControl } from "../../controls/game";
import { audioResources } from "../../objects/global/loader";
import { Action } from "../../ui/action";
import classes from "./pause.module.css";
import { PauseProps } from "./pause.types";

export const PauseScreen = (props: PauseProps) => {
  const resumeGame = () => {
    props.onResume();
    audioControl.playBackground(audioResources.get("blizzard")!);
    gameControl.resumeGame();
  };

  createEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        resumeGame();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    onCleanup(() => {
      document.removeEventListener("keydown", handleKeydown);
    });
  });

  return (
    <div role="menu" class={classes.pause}>
      <Action title="resume" onClick={resumeGame} />
      <Action title="settings" onClick={props.onSettings} />
    </div>
  );
};
