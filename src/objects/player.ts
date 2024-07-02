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
import { createIdleTexture, createRunTexture } from "./player_textures";

const quaternion = new Quaternion();
const yAxis = new Vector3(0, 1, 0);

export const createPlayer = () => {
  const idle = createIdleTexture();
  const run = createRunTexture();

  const material = new MeshBasicMaterial({
    side: FrontSide,
    map: idle.texture,
    color: 0xe9724f,
    transparent: true,
    precision: "highp",
  });

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
        material.map = run.texture;
        run.render(time);
        group.position.add(direction);
        arrowHelper.render(direction);
        quaternion.setFromUnitVectors(yAxis, direction.clone().normalize());
      } else {
        material.map = idle.texture;
        idle.render(time);
      }

      mesh.quaternion.slerp(quaternion, 0.1);
    },
  };
};
