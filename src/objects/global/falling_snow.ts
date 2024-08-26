import { BufferGeometry, Float32BufferAttribute, MathUtils, Points, PointsMaterial } from "three";
import { textureLoader } from "./texture_loader";

const vertices = [];

for (let i = 0; i < 1000; i++) {
  // const xCubeRange = MathUtils.randFloatSpread(2);
  // console.log(xCubeRange);

  // const radius = 1;
  // const radius = 3 * Math.sqrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;

  // const x = radius + Math.cos(theta);
  const x = Math.cos(theta);
  const y = MathUtils.randFloatSpread(3);
  const z = Math.sin(theta); // MathUtils.randFloatSpread(2);
  // const y = MathUtils.randFloatSpread(2);
  // const z = MathUtils.randFloatSpread(2);

  vertices.push(x, y, z);
}

const geometry = new BufferGeometry();

geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

const snowflake = textureLoader.load("/environment/snowflake.png");
const material = new PointsMaterial({
  color: 0xffffff,
  size: 0.05,
  map: snowflake,
  alphaMap: snowflake,
  transparent: true,
  alphaTest: 0.5,
});
const points = new Points(geometry, material);

points.scale.set(2, 2, 2);
points.position.z = 2;

export const fallingSnow = { points };
