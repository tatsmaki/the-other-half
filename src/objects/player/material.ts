import { FrontSide, MeshBasicMaterial } from "three";

const material = new MeshBasicMaterial({
  side: FrontSide,
  color: 0xe9724f,
  transparent: true,
  precision: "highp",
});

export { material };
