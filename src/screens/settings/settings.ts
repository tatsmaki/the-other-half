import { audioControl } from "../../controls/audio";
import { Action } from "../../ui/action";
import { Checkbox } from "../../ui/checkbox";
import { Slider } from "../../ui/slider";
import { onKeyDown } from "../../utils/on_key_down";
import { PauseScreen } from "../pause";

import classes from "./settings.module.css";

export const SettingsScreen = () => {
  const settings = document.createElement("div");

  settings.className = classes.settings;

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      removeScreen();
    }
  };

  const unsubscribe = onKeyDown(handleKeydown);

  const removeScreen = () => {
    settings.remove();
    PauseScreen();
    unsubscribe();
  };

  settings.append(
    Slider({
      title: "music volume",
      defaultValue: audioControl.backgroundVolume,
      onchange(event) {
        audioControl.backgroundVolume = Number(event.target.value);
      },
    }),
    Slider({
      title: "sound volume",
      defaultValue: audioControl.soundVolume,
      onchange(event) {
        audioControl.soundVolume = Number(event.target.value);
      },
    }),
    Checkbox({
      title: "full screen",
      defaultChecked: !!document.fullscreenElement,
      onchange() {
        if (document.fullscreenElement) {
          void document.exitFullscreen();
        } else {
          void document.body.requestFullscreen();
        }
      },
    }),
    Action({
      title: "back",
      onclick() {
        removeScreen();
      },
    })
  );

  document.body.append(settings);
};
