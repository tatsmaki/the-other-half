import {
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Quaternion,
  RepeatWrapping,
  Texture,
  TextureLoader,
  Vector3,
} from "three";
import { createArrowHelper } from "./arrow_helper";

const idle = (texture: Texture, time: number) => {
  const th = 4;
  const tv = 3;
  const total = th * tv;
  const tile = Math.ceil((time / 160) % total);
  const x = Math.ceil(tile / th);
  const y = tile % tv || tv;

  texture.repeat.set(1 / th, 1 / tv);
  texture.offset.x = (1 / th) * x;
  texture.offset.y = (1 / tv) * y;
};

const quaternion = new Quaternion();
const yAxis = new Vector3(0, 1, 0);

export const createPlayer = () => {
  const texture = new TextureLoader().load("Idle.png");

  texture.anisotropy = 4;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.center.x -= 0.01;
  texture.center.y -= 0.02;

  const material = new MeshBasicMaterial({
    side: FrontSide,
    map: texture,
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
        group.position.add(direction);
        arrowHelper.render(direction);
        quaternion.setFromUnitVectors(yAxis, direction.clone().normalize());
      }

      // mesh.rotation.setFromQuaternion(quaternion);
      mesh.quaternion.slerp(quaternion, 0.1);

      idle(texture, time);
    },
  };
};
