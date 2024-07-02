import {
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from "three";
import { createArrowHelper } from "./arrow_helper";
import { createIdleSprite, createRunSprite } from "./player_sprite";

const quaternion = new Quaternion();
const yAxis = new Vector3(0, 1, 0);

export const createPlayer = () => {
  const material = new MeshBasicMaterial({
    side: FrontSide,
    color: 0xe9724f,
    transparent: true,
    precision: "highp",
  });

  const idle = createIdleSprite(material);
  const run = createRunSprite(material);

  const group = new Group();
  const geometry = new PlaneGeometry(1.8, 1.8);

  geometry.rotateZ(Math.PI);

  const mesh = new Mesh(geometry, material);
  const arrowHelper = createArrowHelper();

  group.add(mesh, arrowHelper.mesh);

  return {
    group,
    render(direction: Vector3, time: number) {
      if (direction.length()) {
        run.render(time);
        group.position.add(direction);
        arrowHelper.render(direction);
        quaternion.setFromUnitVectors(yAxis, direction.clone().normalize());
      } else {
        idle.render(time);
      }

      mesh.quaternion.slerp(quaternion, 0.1);
    },
  };
};
