import { WebGLRenderer } from "three";

const renderer = new WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

export { renderer };
