import { Color, FogExp2, GridHelper, Scene } from "three";
import { footsteps } from "../player/footsteps";
import { particles } from "../flame/particles";
import { fallingSnow } from "./falling_snow";
import { createTree } from "../reusable/tree";
import { ambientLight } from "./ambient_light";
import { player } from "../player";
import { collision } from "./collision";
import { snow } from "./map/snow";

export const scene = new Scene();

scene.background = new Color(0xffffff);
scene.fog = new FogExp2(0xffffff, 0.3);

const gridHelper = new GridHelper(10, 10);

gridHelper.position.z = 0.001;
gridHelper.rotation.x = Math.PI / 2;

scene.add(gridHelper, footsteps.group, particles.group, fallingSnow.points, ambientLight);

scene.add(player.group, collision.group, snow.mesh);

createTree();
