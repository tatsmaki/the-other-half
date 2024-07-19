import { BackSide, BoxGeometry, FrontSide, Group, Mesh, MeshLambertMaterial } from "three";

const group = new Group();
const box = new Mesh(new BoxGeometry(0.5, 0.5, 0.5), new MeshLambertMaterial({ color: 0xf1f1f1 }));

box.position.x = 1;
box.position.y = 1;
box.castShadow = true;
box.material.side = FrontSide;
box.material.shadowSide = BackSide;

const box2 = box.clone();

box2.position.x = 1.5;
box2.position.y = 0.5;

group.add(box, box2);

export const collision = { group };
