import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { textureLoader } from "../loader";

const geometry = new PlaneGeometry(10, 10);

const texture = textureLoader.load("/environment/snow.png");
// texture.repeat.set(4, 4);
// texture.wrapS = texture.wrapT = 1000;

const material = new MeshStandardMaterial({
  color: 0xffffff,
  map: texture,
  lightMap: texture,
});

const mesh = new Mesh(geometry, material);

mesh.receiveShadow = true;

export const snow = { mesh };
