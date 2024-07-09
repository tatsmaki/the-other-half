import { Raycaster, Vector3 } from "three";
import { collision } from "../global/collision";

const ray = new Raycaster();

const render = (origin: Vector3, direction: Vector3) => {
  ray.set(origin, direction.clone().normalize());

  const [intersection] = ray.intersectObjects(collision.group.children, true);

  return intersection;
};

export const raycaster = { ray, render };
