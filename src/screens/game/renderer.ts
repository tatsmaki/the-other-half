import { WebGLRenderer } from "three";

export const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
};
