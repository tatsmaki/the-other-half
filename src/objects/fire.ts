import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  SphereGeometry,
  Vector3,
} from "three";
import { mouseControl } from "../controls/mouse";

let position = new Vector3();

export const createFire = () => {
  const mesh = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial());

  return {
    mesh,
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

      mesh.position.lerp(position, 0.1);
    },
  };
};
