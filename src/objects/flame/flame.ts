import { Group, Vector3 } from "three";
import { mouseControl } from "../../controls/mouse";
import { createArrow } from "../reusable/arrow";
import { camera } from "../global/camera";
import { pointLight } from "./point_light";
import { particles } from "./particles";
import { gameControl } from "../../controls/game";

const position = new Vector3();
let distance = 0;
// const maxRadius = 0.6;
const group = new Group();
const arrow = createArrow(0.3, 0xffffff);

group.add(arrow.mesh, pointLight);

const render = (time: number, delta: number) => {
  if (mouseControl.isActive && gameControl.isActive) {
    const projection = mouseControl.projection;

    position.copy(projection.unproject(camera));
    // position.clampLength(0, maxRadius);
    position.sub(camera.position);
    position.z = 0.01;
    distance = group.position.distanceTo(position);

    // if (!audioControl.sound.isPlaying) {
    //   audioControl.playSound(audioResources.get("flame.wav")!);
    // }
  } else {
    position.x = 0;
    position.y = 0;
    distance = 0;

    // if (audioControl.sound.isPlaying) {
    //   audioControl.sound.stop();
    // }
  }

  const offset = group.position.lerp(position, 0.1);
  const offsetLength = offset.length();
  const lightIntensity = Math.max(0.05, distance);
  const isFlameVisible = offsetLength > 0.03;

  pointLight.intensity = lightIntensity;
  group.visible = isFlameVisible;

  arrow.render(position.clone().sub(group.position).normalize());

  particles.render({
    time,
    delta,
    canCreateParticle: isFlameVisible,
    position: group.position.clone().add(camera.position),
    rotation: arrow.mesh.rotation,
    distance,
  });
};

export const flame = { group, render };
