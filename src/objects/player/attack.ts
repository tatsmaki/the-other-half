import {
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  TextureLoader,
  Vector3,
} from "three";
import { mouseControl } from "../../controls/mouse";
import { createArrow } from "../reusable/arrow";
import { camera } from "../global/camera";
import { pointLight } from "./point_light";

const position = new Vector3();
// const maxRadius = 0.6;
const group = new Group();
const geometry = new PlaneGeometry(0.3, 0.3);
const textureLoader = new TextureLoader();
const flame = textureLoader.load("flame_ball.png");
const material = new MeshBasicMaterial({
  side: FrontSide,
  map: flame,
  transparent: true,
});
const mesh = new Mesh(geometry, material);
const arrow = createArrow(0.3, 0xffffff);

group.add(mesh, arrow.mesh, pointLight);

const render = () => {
  if (mouseControl.isActive) {
    const projection = mouseControl.projection;

    position.copy(projection.unproject(camera));
    // position.clampLength(0, maxRadius);
    position.sub(camera.position);
    position.z = 0;
  } else {
    position.x = 0;
    position.y = 0;
  }

  const offset = group.position.lerp(position, 0.1);
  const offsetLength = offset.length();

  pointLight.intensity = offsetLength / 3;
  group.visible = offsetLength > 0.01;
  arrow.render(position.clone().sub(group.position).normalize());
};

export const attack = { group, render };
