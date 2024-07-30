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
const fadeOutSpeed = 1.1;
const betweenParticles = 30;
const scaleDown = 0.3;
const translateSpeed = 0.5;
const geometry = new PlaneGeometry(0.7, 0.7);
const material = new MeshBasicMaterial({
  side: FrontSide,
  color: 0xf7ed48,
  transparent: true,
});
const particle = new Mesh(geometry, material);
const group = new Group<never, typeof particle>();

type CreateParticleArgs = {
  time: number;
  position: Vector3;
  rotation: Euler;
  distance: number;
};

const createParticle = throttle(({ time, position, rotation, distance }: CreateParticleArgs) => {
  const newParticle = particle.clone(true);

  newParticle.rotation.z = rotation.z;
  newParticle.position.copy({ ...position, z: -0 });

  if (distance < 0.1) {
    newParticle.scale.x = scaleDown;
    newParticle.scale.y = scaleDown;
  }

  newParticle.material = material.clone();
  newParticle.material.needsUpdate = true;

  const map = sprite.flame.clone();
  newParticle.material.map = map;
  newParticle.material.map.needsUpdate = true;

  newParticle.userData.translateX = getRandomNumber();
  newParticle.userData.translateY = getRandomNumber();

  group.add(newParticle);

  sprite.render(time, map);
}, betweenParticles);

type RenderParticlesArgs = {
  time: number;
  delta: number;
  canCreateParticle: boolean;
  position: Vector3;
  rotation: Euler;
  distance: number;
};

const render = ({
  time,
  delta,
  canCreateParticle,
  position,
  rotation,
  distance,
}: RenderParticlesArgs) => {
  group.children.forEach((particle) => {
    const scale = Math.max(0, particle.scale.x - fadeOutSpeed * delta);

    particle.scale.x = scale;
    particle.scale.y = scale;

    if (particle.scale.x <= 0) {
      group.remove(particle);
    }

    particle.translateX(particle.userData.translateX * translateSpeed * delta);
    particle.translateY(particle.userData.translateY * translateSpeed * delta);

    const material = particle.material;
    const map = material.map!;

    material.color.lerp(endColor, 0.05);
    sprite.render(time, map);
  });

  if (canCreateParticle) {
    createParticle({ time, position, rotation, distance });
  }
};

export const particles = { group, render };
