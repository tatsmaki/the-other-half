import { Object3D } from "three";

declare module "three" {
  export interface Group<TChild extends Object3D = Object3D> extends Object3D {
    children: TChild[];
  }

  export interface Audio {
    fadeIn(volume: number, duration?: number): void;

    fadeOut(volume: number, duration?: number): void;
  }
}
