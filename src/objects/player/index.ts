import { Group, Mesh, PlaneGeometry, Quaternion, Vector3 } from "three";
import { createArrow } from "../reusable/arrow";
import { camera } from "../global/camera";
import { raycaster } from "./raycaster";
import { material } from "./material";
import { sprite } from "./sprite";
import { keyboardControl } from "../../controls/keyboard";
import { attack } from "./attack";
import { directionalLight } from "../global/directional_light";
import { footstep } from "./footstep";

const quaternion = new Quaternion();
const yAxis = new Vector3(0, 1, 0);
const runSpeed = 0.015;
const group = new Group();
const geometry = new PlaneGeometry(1.8, 1.8);
const mesh = new Mesh(geometry, material);
const arrow = createArrow();

mesh.position.z = 0.03;
mesh.castShadow = true;

group.add(mesh, arrow.mesh, attack.group, directionalLight);
directionalLight.target = group;
directionalLight.lookAt(group.position);

const render = (time: number) => {
  const direction = keyboardControl.direction.normalize();

  if (direction.length()) {
    sprite.render({ texture: sprite.run, time, th: 5, tv: 4 });
    quaternion.setFromUnitVectors(yAxis, direction);

    const intersection = raycaster.render(group.position, direction);

    if (!intersection || intersection?.distance > 0.2) {
      const velocity = direction.clone().clampLength(0, runSpeed);

      group.position.add(velocity);
      camera.position.add(velocity);
      arrow.render(direction);
    }
  } else {
    sprite.render({ texture: sprite.idle, time, th: 4, tv: 3 });
  }

  footstep.render(direction, group.position, mesh.rotation);

  mesh.quaternion.slerp(quaternion, 0.1);
  attack.render();
};

export const player = { group, render };
