import { Group, Mesh, PlaneGeometry, Quaternion, Vector3 } from "three";
import { createArrow } from "../reusable/arrow";
import { camera } from "../global/camera";
import { raycaster } from "./raycaster";
import { material } from "./material";
import { sprite } from "./sprite";
import { keyboardControl } from "../../controls/keyboard";
import { flame } from "../flame";
import { directionalLight } from "../global/directional_light";
import { footsteps } from "./footsteps";

const quaternion = new Quaternion();
const yAxis = new Vector3(0, 1, 0);
const runSpeed = 1.2;
const group = new Group();
const geometry = new PlaneGeometry(1.8, 1.8);
const mesh = new Mesh(geometry, material);
const arrow = createArrow();
const velocity = new Vector3();

mesh.position.z = 0.03;
mesh.castShadow = true;

group.add(mesh, arrow.mesh, flame.group, directionalLight);
directionalLight.target = group;
directionalLight.lookAt(group.position);

const render = (time: number, delta: number) => {
  const direction = keyboardControl.direction.normalize();

  if (direction.length()) {
    sprite.render({ texture: sprite.run, time, th: 5, tv: 4 });
    quaternion.setFromUnitVectors(yAxis, direction);

    const intersection = raycaster.render(group.position, direction);

    if (!intersection || intersection?.distance > 0.2) {
      velocity.copy(direction).clampLength(0, runSpeed * delta);

      group.position.add(velocity);
      camera.position.add(velocity);
      arrow.render(direction);
    }
  } else {
    sprite.render({ texture: sprite.idle, time, th: 4, tv: 3 });
  }

  footsteps.render({
    direction,
    position: group.position,
    rotation: mesh.rotation,
    delta,
  });

  mesh.quaternion.slerp(quaternion, 0.1);
  flame.render(time, delta);
};

export const player = { group, render };
