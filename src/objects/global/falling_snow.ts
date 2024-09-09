import {
  BufferGeometry,
  Float32BufferAttribute,
  MathUtils,
  Points,
  PointsMaterial,
  Vector3,
} from "three";
import { textureLoader } from "./loader";
import { camera } from "./camera";

const vertices: number[] = [];

const createVertex = () => {
  const vector = new Vector3();
  // const theta = Math.random() * 2 * Math.PI;
  // const x = -Math.abs(Math.cos(theta));
  // const y = MathUtils.randFloatSpread(2);
  // const z = -Math.abs(Math.sin(theta));
  vector.randomDirection();
  vector.clampLength(0, MathUtils.randFloatSpread(1) + 1);

  // return { x, y, z };
  return vector;
};

for (let i = 0; i < 250; i++) {
  const { x, y, z } = createVertex();

  vertices.push(x, y, z);
}

const geometry = new BufferGeometry();

geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

const snowflake = textureLoader.load("/environment/snowflake.png");

const material = new PointsMaterial({
  color: 0xffffff,
  size: 0.015,
  map: snowflake,
  alphaMap: snowflake,
  transparent: true,
  alphaTest: 0.5,
});
const points = new Points(geometry, material);
const zOffset = 2.3;
const ySpeed = -0.001;

points.position.z = zOffset;

const vertex = new Vector3();
const yAxis = new Vector3(0, 1, 0);

const render = () => {
  const positionAttr = geometry.getAttribute("position");

  for (let i = 0; i < positionAttr.count; i += 1) {
    vertex.fromBufferAttribute(positionAttr, i);
    vertex.applyAxisAngle(yAxis, ySpeed);

    if (vertex.z > 0) {
      vertex.applyAxisAngle(yAxis, Math.PI);
    }

    positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  positionAttr.needsUpdate = true;
  points.position.set(camera.position.x, camera.position.y, zOffset);
};

export const fallingSnow = { points, render };
