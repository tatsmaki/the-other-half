import { DirectionalLight } from "three";

const mapSize = 2048;

export const directionalLight = new DirectionalLight(0xffffff, 1);

directionalLight.position.set(2, 2, 2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = mapSize;
directionalLight.shadow.mapSize.height = mapSize;
// directionalLight.shadow.bias = 0.00005;
