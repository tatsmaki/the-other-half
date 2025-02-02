import { createEffect, onCleanup } from "solid-js";
import { audioControl } from "../../controls/audio";
import { Action } from "../../ui/action";
import { Slider } from "../../ui/slider";

import classes from "./settings.module.css";
import { SettingsProps } from "./settings.types";

export const SettingsScreen = (props: SettingsProps) => {
  const closeSettings = () => {
    props.onClose();
  };

  createEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        closeSettings();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    onCleanup(() => {
      document.removeEventListener("keydown", handleKeydown);
    });
  });

  //   Checkbox({
  //     title: "full screen",
  //     defaultChecked: !!document.fullscreenElement,
  //     onchange() {
  //       if (document.fullscreenElement) {
  //         void document.exitFullscreen();
  //       } else {
  //         void document.body.requestFullscreen();
  //       }
  //     },
  //   }),

  return (
    <div class={classes.settings}>
      <Slider
        title="music volume"
        defaultValue={audioControl.backgroundVolume}
        onChange={(volume: number) => {
          audioControl.backgroundVolume = volume;
        }}
      />
      <Slider
        title="sound volume"
        defaultValue={audioControl.soundVolume}
        onChange={(volume: number) => {
          audioControl.soundVolume = volume;
        }}
      />
      <Action title="Back" onClick={closeSettings} />
    </div>
  );
};
