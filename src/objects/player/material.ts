import { FrontSide, MeshBasicMaterial } from "three";

const material = new MeshBasicMaterial({
  side: FrontSide,
  color: 0xe9724f,
  transparent: true,
  precision: "highp",
  alphaTest: 0.5,
  shadowSide: FrontSide,
});

export { material };
