import { DirectionalLight } from "three";

export const directionalLight = new DirectionalLight(0xffffff, 2);

directionalLight.position.set(2, 2, 2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.bias = 0.00005;
