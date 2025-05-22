import { PerspectiveCamera } from "three";

const aspect = window.innerWidth / window.innerHeight;
const fov = 70;
const near = 0.01;
const far = 2;
const camera = new PerspectiveCamera(fov, aspect, near, far + 0.01);

camera.position.z = far;

export { camera };
