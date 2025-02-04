import { Audio, AudioListener } from "three";
import { camera } from "../objects/global/camera";
import { settingsControl } from "./settings";

class AudioControl {
  private listener: AudioListener;
  background: Audio;
  sound: Audio;

  constructor() {
    this.listener = new AudioListener();
    this.background = new Audio(this.listener);
    this.sound = new Audio(this.listener);

    camera.add(this.listener);
  }

  playBackground(buffer: AudioBuffer) {
    this.background.setBuffer(buffer);
    this.background.setLoop(true);
    this.background.play();
    this.background.fadeIn(settingsControl.settings.backgroundVolume);
  }

  stopBackground() {
    this.background.fadeOut(settingsControl.settings.backgroundVolume);

    if (this.background.source) {
      const { currentTime } = this.listener.context;

      this.background.source.stop(currentTime + 1);
      this.background.source.onended = null;
      this.background.isPlaying = false;
    }
  }

  playSound(buffer: AudioBuffer) {
    this.sound.setBuffer(buffer);
    this.sound.setLoop(true);
    this.sound.setVolume(settingsControl.settings.soundVolume);
    this.sound.play();
  }
}

export const audioControl = new AudioControl();

Audio.prototype.fadeIn = function (volume, duration = 1) {
  const { currentTime } = this.listener.context;

  this.gain.gain
    .setValueAtTime(0, currentTime)
    .linearRampToValueAtTime(volume, currentTime + duration);
};

Audio.prototype.fadeOut = function (volume, duration = 1) {
  const { currentTime } = this.listener.context;

  this.gain.gain
    .cancelScheduledValues(currentTime)
    .setValueAtTime(volume, currentTime)
    .linearRampToValueAtTime(0, currentTime + duration);
};
