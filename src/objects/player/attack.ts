import { Group, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from "three";
import { mouseControl } from "../../controls/mouse";
import { createArrow } from "../reusable/arrow";
import { camera } from "../global/camera";

let position = new Vector3();

const group = new Group();
const mesh = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial());
const arrow = createArrow(0.3, 0xffffff);

group.add(mesh, arrow.mesh);

const render = () => {
  if (mouseControl.isActive) {
    const dx = (mouseControl.x / window.innerWidth) * 2 - 1;
    const dy = (mouseControl.y / window.innerHeight) * -2 + 1;
    const projection = new Vector3(dx, dy, 1);

    position = projection.unproject(camera);
    // position.clampLength(0, 1);
    position.sub(camera.position);

    position.z = 0;
  } else {
    position.x = 0;
    position.y = 0;
  }

  group.position.lerp(position, 0.1);
  arrow.render(position.clone().sub(group.position));
};

export const attack = { group, render };
