import { PerspectiveCamera } from "three";

export const createCamera = () => {
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new PerspectiveCamera(70, aspect, 0.01, 10);

  camera.position.z = 2;

  return camera;
};
