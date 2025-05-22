import { BackSide, BoxGeometry, FrontSide, Mesh, MeshLambertMaterial } from "three";

export const createWall = () => {
  const wallGeo = new BoxGeometry(0.5, 0.5, 0.5);
  const wallMat = new MeshLambertMaterial({ color: 0xf1f1f1 });
  const wall = new Mesh(wallGeo, wallMat);

  wall.position.x = 1;
  wall.position.y = 1;
  wall.castShadow = true;
  wall.material.side = FrontSide;
  wall.material.shadowSide = BackSide;

  return wall;
};
