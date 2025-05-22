import { SpotLight } from "three";

export const spotLight = new SpotLight(0xffffff, 1.2, 10, Math.PI / 6, 0.5, 0);

spotLight.position.set(0, 0, 2);
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 2048;
// spotLight.shadow.mapSize.height = 2048;
