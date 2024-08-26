import { Euler, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three";
import throttle from "lodash.throttle";
import { textureLoader } from "../global/texture_loader";

const fadeOutSpeed = 0.6;
const betweenSteps = 200;
const geometry = new PlaneGeometry(0.06, 0.155);
const left = new MeshBasicMaterial({
  transparent: true,
  map: textureLoader.load("/footsteps/left.png"),
});
const right = new MeshBasicMaterial({
  transparent: true,
  map: textureLoader.load("/footsteps/right.png"),
});
const step = new Mesh(geometry, left);
const group = new Group<never, typeof step>();

let isRight = false;

const createStep = throttle((position: Vector3, rotation: Euler) => {
  const newStep = step.clone();

  newStep.rotation.z = rotation.z;
  newStep.position.copy({ ...position, z: 0.01 });

  if (isRight) {
    newStep.material = right.clone();
    newStep.translateX(0.05);
  } else {
    newStep.material = left.clone();
    newStep.translateX(-0.05);
  }

  isRight = !isRight;

  group.add(newStep);
}, betweenSteps);

type FootstepsRenderArgs = {
  direction: Vector3;
  position: Vector3;
  rotation: Euler;
  delta: number;
};

const render = ({ direction, position, rotation, delta }: FootstepsRenderArgs) => {
  group.children.forEach((step) => {
    step.material.opacity -= fadeOutSpeed * delta;

    if (step.material.opacity <= 0) {
      group.remove(step);
    }
  });

  if (direction.length()) {
    createStep(position, rotation);
  }
};

export const footsteps = { group, render };
