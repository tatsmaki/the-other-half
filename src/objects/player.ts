import {
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
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
  const tile = Math.ceil((time / 200) % total);
  const x = Math.ceil(tile / th);
  const y = tile % tv || tv;

  texture.repeat.set(1 / th, 1 / tv);
  texture.offset.x = (1 / th) * x;
  texture.offset.y = (1 / tv) * y;
};

export const createPlayer = () => {
  const texture = new TextureLoader().load("Idle.png");
  const material = new MeshBasicMaterial({
    side: FrontSide,
    map: texture,
    color: 0xfb601d,
    transparent: true,
  });

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;

  const group = new Group();
  const geometry = new PlaneGeometry(2, 2);
  const mesh = new Mesh(geometry, material);
  const arrowHelper = createArrowHelper();

  group.add(mesh, arrowHelper.mesh);

  return {
    group,
    render(direction: Vector3, time: number) {
      arrowHelper.render(direction);
      group.position.add(direction);

      // group.rotation.z = new Vector3(0, -1, 0).angleTo(direction);

      idle(texture, time);
    },
  };
};
