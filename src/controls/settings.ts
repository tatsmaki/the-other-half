type Settings = {
  backgroundVolume: number;
  soundVolume: number;
  fullScreen: boolean;
};

const defaultSettings: Settings = {
  backgroundVolume: 0.1,
  soundVolume: 0.2,
  fullScreen: true,
};

class SettingsControl {
  settings = defaultSettings;

  constructor() {
    this.getSettings();
  }

  private getSettings() {
    const maybeSettings = localStorage.getItem("settings") || "{}";
    const settings = JSON.parse(maybeSettings) as Settings;

    this.settings = {
      ...this.settings,
      ...settings,
    };
  }

  setSettings(settings: Partial<Settings>) {
    this.settings = {
      ...this.settings,
      ...settings,
    };

    localStorage.setItem("settings", JSON.stringify(this.settings));
  }
}

export const settingsControl = new SettingsControl();
