import { settingsControl } from "../controls/settings";

export const checkFullscreen = () => {
  if (settingsControl.settings.fullScreen) {
    void document.body.requestFullscreen();
  }
};
