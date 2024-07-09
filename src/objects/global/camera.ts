import { PerspectiveCamera } from "three";

const aspect = window.innerWidth / window.innerHeight;
const camera = new PerspectiveCamera(70, aspect, 0.01, 2);

camera.position.z = 2;

export { camera };
