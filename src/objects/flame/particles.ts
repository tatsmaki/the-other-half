import {
  Color,
  Euler,
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector3,
} from "three";
import { sprite } from "./sprite";
import throttle from "lodash.throttle";
import { getRandomNumber } from "../../utils/random";

const endColor = new Color(0xe9724f);
// const zAxis = new Vector3(0, 0, 1);
const geometry = new PlaneGeometry(0.7, 0.7);
const material = new MeshBasicMaterial({
  side: FrontSide,
  color: 0xf7ed48,
  transparent: true,
});
const particle = new Mesh(geometry, material);
const group = new Group<never, typeof particle>();

const createParticle = throttle((time: number, position: Vector3, rotation: Euler) => {
  const newParticle = particle.clone(true);

  newParticle.rotation.z = rotation.z;
  newParticle.position.copy({ ...position, z: -0 });
  newParticle.material = material.clone();
  newParticle.material.needsUpdate = true;

  const map = sprite.flame.clone();
  newParticle.material.map = map;
  newParticle.material.map.needsUpdate = true;

  newParticle.userData.translateX = getRandomNumber();
  newParticle.userData.translateY = getRandomNumber();

  group.add(newParticle);

  sprite.render(time, map);
}, 30);

type RenderParticlesArgs = {
  time: number;
  canCreateParticle: boolean;
  position: Vector3;
  rotation: Euler;
};

const render = ({ time, canCreateParticle, position, rotation }: RenderParticlesArgs) => {
  group.children.forEach((particle) => {
    particle.scale.x -= 0.01;
    particle.scale.y -= 0.01;

    if (particle.scale.x <= 0.2) {
      group.remove(particle);

      return;
    }

    particle.translateX(particle.userData.translateX * 0.003);
    particle.translateY(particle.userData.translateY * 0.003);
    particle.position.z += 0.001;

    const material = particle.material;

    material.color.lerp(endColor, 0.05);

    const map = material.map!;

    sprite.render(time, map);
  });

  if (canCreateParticle) {
    createParticle(time, position, rotation);
  }
};

export const particles = { group, render };
