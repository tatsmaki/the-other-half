import { FrontSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three";
import { mouseControl } from "../../controls/mouse";
import { createArrow } from "../reusable/arrow";
import { camera } from "../global/camera";
import { pointLight } from "./point_light";
import { textureLoader } from "../global/texture_loader";
import { particles } from "./particles";

const position = new Vector3();
// const maxRadius = 0.6;
const group = new Group();
const geometry = new PlaneGeometry(0.3, 0.3);
const texture = textureLoader.load("flame_ball.png");
const material = new MeshBasicMaterial({
  side: FrontSide,
  map: texture,
  transparent: true,
});
const mesh = new Mesh(geometry, material);
const arrow = createArrow(0.3, 0xffffff);

group.add(arrow.mesh, pointLight);

const render = (time: number) => {
  if (mouseControl.isActive) {
    const projection = mouseControl.projection;

    position.copy(projection.unproject(camera));
    // position.clampLength(0, maxRadius);
    position.sub(camera.position);
    position.z = 0.01;
  } else {
    position.x = 0;
    position.y = 0;
  }

  const offset = group.position.lerp(position, 0.1);
  const offsetLength = offset.length();
  const lightIntensity = offsetLength / 3;
  const isFlameVisible = offsetLength > 0.03;

  pointLight.intensity = lightIntensity;
  group.visible = isFlameVisible;

  arrow.render(position.clone().sub(group.position).normalize());

  particles.render({
    time,
    canCreateParticle: isFlameVisible,
    position: group.position,
    rotation: arrow.mesh.rotation,
  });
};

export const flame = { group, render };
