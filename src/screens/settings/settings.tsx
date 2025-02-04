import { createEffect, onCleanup } from "solid-js";
import { Action } from "../../ui/action";
import { Slider } from "../../ui/slider";
import { Checkbox } from "../../ui/checkbox";
import classes from "./settings.module.css";
import { SettingsProps } from "./settings.types";
import { settingsControl } from "../../controls/settings";

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

  return (
    <div class={classes.settings}>
      <Slider
        title="music volume"
        defaultValue={settingsControl.settings.backgroundVolume}
        onChange={(volume) => {
          settingsControl.setSettings({ backgroundVolume: volume });
        }}
      />
      <Slider
        title="sound volume"
        defaultValue={settingsControl.settings.soundVolume}
        onChange={(volume) => {
          settingsControl.setSettings({ soundVolume: volume });
        }}
      />
      <Checkbox
        title="full screen"
        defaultChecked={settingsControl.settings.fullScreen}
        onChange={(checked: boolean) => {
          settingsControl.setSettings({ fullScreen: checked });

          if (checked) {
            void document.body.requestFullscreen();
          }

          if (!checked && document.fullscreenElement) {
            void document.exitFullscreen();
          }
        }}
      />
      <Action title="Back" onClick={closeSettings} />
    </div>
  );
};
