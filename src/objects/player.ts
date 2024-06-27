import {
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  RepeatWrapping,
  TextureLoader,
  Vector3,
} from "three";
import { createArrowHelper } from "./arrow_helper";

export const createPlayer = () => {
  const texture = new TextureLoader().load("Idle.png");
  const material = new MeshBasicMaterial({
    side: FrontSide,
    map: texture,
    alphaHash: true,
    color: 0xfb601d,
  });

  texture.offset.x = -0.5;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;

  const group = new Group();
  const geometry = new PlaneGeometry(0.2, 0.2);
  const mesh = new Mesh(geometry, material);
  const arrowHelper = createArrowHelper();

  group.add(mesh, arrowHelper.mesh);

  return {
    group,
    render(direction: Vector3) {
      arrowHelper.render(direction);
      group.position.add(direction);
    },
  };
};
