import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from "three";

const group = new Group();

const box = new Mesh(new BoxGeometry(0.5, 0.5, 0.5), new MeshBasicMaterial());
box.position.x = 1;
box.position.y = 1;

const box2 = box.clone();
box.position.x = 1.5;
box.position.y = 0.5;

group.add(box, box2);

export const collision = { group };
