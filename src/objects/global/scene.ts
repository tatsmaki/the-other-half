import { AxesHelper, Scene } from "three";

const scene = new Scene();
const axesHelper = new AxesHelper(1);

scene.add(axesHelper);

export { scene };
