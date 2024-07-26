import { Object3D } from "three";

declare module "three" {
  export interface Group<TChild extends Object3D = Object3D> extends Object3D {
    children: TChild[];
  }
}
