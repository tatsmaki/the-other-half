import { Group, Mesh, PlaneGeometry, Quaternion, Vector3 } from "three";
import { createArrow } from "../reusable/arrow";
import { camera } from "../global/camera";
import { raycaster } from "./raycaster";
import { material } from "./material";
import { sprite } from "./sprite";
import { keyboardControl } from "../../controls/keyboard";
import { attack } from "./attack";

const quaternion = new Quaternion();
const yAxis = new Vector3(0, 1, 0);
const group = new Group();
const geometry = new PlaneGeometry(1.8, 1.8);
const mesh = new Mesh(geometry, material);
const arrow = createArrow();

geometry.rotateZ(Math.PI);
mesh.position.z = 0.1;
group.add(mesh, arrow.mesh, attack.group);

const render = (time: number) => {
  const direction = keyboardControl.direction;

  if (direction.length()) {
    sprite.render({ texture: sprite.run, time, th: 5, tv: 4 });
    quaternion.setFromUnitVectors(yAxis, direction.clone().normalize());

    const intersection = raycaster.render(group.position, direction);

    if (!intersection || intersection?.distance > 0.2) {
      group.position.add(direction);
      camera.position.add(direction);
      arrow.render(direction);
    }
  } else {
    sprite.render({ texture: sprite.idle, time, th: 4, tv: 3 });
  }

  mesh.quaternion.slerp(quaternion, 0.1);
  attack.render();
};

export const player = { group, render };
