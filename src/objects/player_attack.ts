import {
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  SphereGeometry,
  Vector3,
} from "three";
import { mouseControl } from "../controls/mouse";
import { createArrowHelper } from "./arrow_helper";

let position = new Vector3();

export const createFire = () => {
  const group = new Group();
  const mesh = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial());
  const arrowHelper = createArrowHelper(0.3);

  group.add(mesh);
  group.add(arrowHelper.mesh);

  return {
    group,
    update(camera: PerspectiveCamera) {
      if (mouseControl.isActive) {
        const dx = (mouseControl.x / window.innerWidth) * 2 - 1;
        const dy = (mouseControl.y / window.innerHeight) * -2 + 1;
        const projection = new Vector3(dx, dy, 1);

        position = projection.unproject(camera);
        position.z = 0;
      } else {
        position.x = 0;
        position.y = 0;
      }

      group.position.lerp(position, 0.1);
      arrowHelper.render(position.clone().sub(group.position));
    },
  };
};
