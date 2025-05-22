import { LoadingManager, AudioLoader, TextureLoader } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loadingManager = new LoadingManager();

export const audioResources = new Map<string, AudioBuffer>();

export const audioLoader = new AudioLoader(loadingManager);

export const loadAudio = () => {
  audioLoader.load("/audio/blizzard.mp3", (buffer) => {
    audioResources.set("blizzard", buffer);
  });
  audioLoader.load("/audio/flame.mp3", (buffer) => {
    audioResources.set("flame", buffer);
  });
};

export const textureLoader = new TextureLoader(loadingManager);

export const gltfLoader = new GLTFLoader(loadingManager);
