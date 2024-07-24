import { Euler, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three";
import throttle from "lodash.throttle";
import { textureLoader } from "../global/texture_loader";

const group = new Group();
const geometry = new PlaneGeometry(0.06, 0.155);
const left = new MeshBasicMaterial({
  transparent: true,
  map: textureLoader.load("footstep/left.png"),
});
const right = new MeshBasicMaterial({
  transparent: true,
  map: textureLoader.load("footstep/right.png"),
});
const step = new Mesh(geometry);

let isRight = false;

const render = throttle((position: Vector3, rotation: Euler) => {
  const newStep = step.clone();

  newStep.rotation.z = rotation.z;
  newStep.position.copy({ ...position, z: 0.01 });

  if (isRight) {
    newStep.material = right;
    newStep.translateX(0.05);
  } else {
    newStep.material = left;
    newStep.translateX(-0.05);
  }

  isRight = !isRight;

  group.add(newStep);

  setTimeout(() => {
    group.remove(newStep);
  }, 1000);
}, 200);

export const footstep = { group, render };
