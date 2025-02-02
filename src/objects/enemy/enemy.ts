/* eslint-disable @typescript-eslint/no-unused-vars */
import { DoubleSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { player } from "../player";

const mesh = new Mesh(new PlaneGeometry(0.5, 0.5), new MeshBasicMaterial({ side: DoubleSide }));
// const box = createBox();
const group = new Group();

group.position.x = 0;
group.position.y = -1;
group.position.z = 0.1;

group.add(mesh);

const idle = () => {};

const run = (delta: number) => {
  console.log(delta);
  const direction = group.position.clone().negate().add(player.group.position).normalize();

  group.position.add(direction.multiplyScalar(0.01));
};

const render = (delta: number) => {
  const distance = group.position.distanceTo(player.group.position);

  if (distance < 2) {
    run(delta);
  } else {
    idle();
  }
};

export const enemy = {
  group,
  render,
};
