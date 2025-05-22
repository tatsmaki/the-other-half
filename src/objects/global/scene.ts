import { AxesHelper, Scene } from "three";
import { hemisphereLight } from "./hemisphere_light";
import { footsteps } from "../player/footsteps";
import { particles } from "../flame/particles";
import { fallingSnow } from "./falling_snow";
import { createTree } from "../reusable/tree";

export const scene = new Scene();
const helper = new AxesHelper(1);

helper.position.z = 0.001;

scene.add(helper, hemisphereLight, footsteps.group, particles.group, fallingSnow.points);

createTree();
