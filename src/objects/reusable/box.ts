import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

export const createBox = () => {
  const box = new Mesh(new BoxGeometry(0.5, 0.5, 0.5), new MeshBasicMaterial({}));

  box.visible = false;

  return box;
};
