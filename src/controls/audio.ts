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

    // @ts-expect-error safari audio session
    Object.assign(navigator.audioSession || {}, { type: "playback" });

    camera.add(this.listener);
  }

  playBackground(buffer: AudioBuffer) {
    this.background.setBuffer(buffer);
    this.background.setLoop(true);
    this.background.setVolume(0);
    this.background.play(0.1);
    this.background.fadeIn(3, 0, settingsControl.settings.backgroundVolume);
  }

  stopBackground() {
    this.background.fadeOut(1, 0);

    if (this.background.source) {
      const { currentTime } = this.listener.context;

      this.background.source.stop(currentTime +1);
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

Audio.prototype.fadeIn = function (duration, volumeNow = 0, volumeThen = 1) {
  const { currentTime } = this.listener.context;
  const timeConstant = duration / 3;

  this.gain.gain
    .cancelScheduledValues(currentTime)
    .setValueAtTime(volumeNow, currentTime)
    .setTargetAtTime(volumeThen, currentTime, timeConstant);
};

Audio.prototype.fadeOut = function (duration, volumeThen = 0) {
  const { currentTime } = this.listener.context;
  const timeConstant = duration / 3;

  this.gain.gain
    .cancelScheduledValues(currentTime)
    .setValueAtTime(this.getVolume(), currentTime)
    .setTargetAtTime(volumeThen, currentTime, timeConstant)
};
