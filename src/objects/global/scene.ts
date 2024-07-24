import { AxesHelper, Mesh, MeshLambertMaterial, PlaneGeometry, Scene } from "three";
import { hemisphereLight } from "./hemisphere_light";
import { footstep } from "../player/footstep";

export const scene = new Scene();
const helper = new AxesHelper(1);

helper.position.z = 0.001;

const ground = new Mesh(new PlaneGeometry(4, 4), new MeshLambertMaterial({ color: 0xffffff }));

ground.receiveShadow = true;

scene.add(helper, ground, hemisphereLight, footstep.group);
