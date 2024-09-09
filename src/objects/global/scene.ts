import { AxesHelper, Mesh, MeshLambertMaterial, PlaneGeometry, Scene } from "three";
import { hemisphereLight } from "./hemisphere_light";
import { footsteps } from "../player/footsteps";
import { particles } from "../flame/particles";
import { textureLoader } from "./loader";
import { fallingSnow } from "./falling_snow";
import { createTree } from "../reusable/tree";

export const scene = new Scene();
const helper = new AxesHelper(1);

helper.position.z = 0.001;

const snow = textureLoader.load("/environment/snow.png");

const ground = new Mesh(
  new PlaneGeometry(10, 10),
  new MeshLambertMaterial({ color: 0xffffff, map: snow, lightMap: snow, lightMapIntensity: 1.5 })
);

ground.receiveShadow = true;

scene.add(helper, ground, hemisphereLight, footsteps.group, particles.group, fallingSnow.points);

createTree();
