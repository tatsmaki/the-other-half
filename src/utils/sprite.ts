import { Texture } from "three";

export type RenderSpriteArgs = {
  texture: Texture;
  time: number;
  th: number;
  tv: number;
};

const frameTime = 60;
let prevTime = 0;
let tile = 1;

export const resetSprite = (time: number) => {
  prevTime = time;
  tile = 1;
};

export const renderSprite = ({ texture, time, th, tv }: RenderSpriteArgs) => {
  const nextTime = prevTime + frameTime;

  if (nextTime < time) {
    prevTime = time;
    tile += 1;
  }

  const total = th * tv;

  if (tile > total) {
    resetSprite(time);
  }

  const x = tile % th || th;
  const y = Math.ceil(tile / th);

  texture.repeat.set(1 / th, 1 / tv);
  texture.offset.x = (1 / th) * -x;
  texture.offset.y = (1 / tv) * y;
};
