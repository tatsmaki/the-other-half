import { PointLight } from "three";

export const pointLight = new PointLight(0xc88253, 1, 100);

pointLight.position.z = 0.2;
pointLight.shadow.camera.near = 0.001;
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 512;
pointLight.shadow.mapSize.height = 512;
pointLight.shadow.bias = 0.00005;
