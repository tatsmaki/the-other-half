import { Group } from "three";
import { createWall } from "../reusable/wall";

const group = new Group();
const wall = createWall();

const wall2 = wall.clone();

wall2.position.x = 1.5;
wall2.position.y = 0.5;

group.add(wall, wall2);

export const collision = { group };
