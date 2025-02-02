import { Raycaster, Vector3 } from "three";
import { enemy } from "../enemy/enemy";

const ray = new Raycaster();

const render = (origin: Vector3, direction: Vector3) => {
  ray.set(origin, direction.clone().normalize());

  const [intersection] = ray.intersectObjects(enemy.group.children, true);

  return intersection;
};

export const raycaster = { ray, render };
