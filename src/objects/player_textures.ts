import { RepeatWrapping, Texture, TextureLoader } from "three";

const textureLoader = new TextureLoader();
const frame = 160;

const sprite = (texture: Texture, time: number, th: number, tv: number) => {
  const total = th * tv;
  const tile = Math.ceil((time / frame) % total);
  const x = Math.ceil(tile / th);
  const y = tile % tv || tv;

  texture.repeat.set(1 / th, 1 / tv);
  texture.offset.x = (1 / th) * x;
  texture.offset.y = (1 / tv) * y;
};

export const createIdleTexture = () => {
  const texture = textureLoader.load("Idle.png");

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.center.x -= 0.01;
  texture.center.y -= 0.02;

  return {
    texture,
    render(time: number) {
      sprite(texture, time, 4, 3);
    },
  };
};

export const createRunTexture = () => {
  const texture = textureLoader.load("Run.png");

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;

  return {
    texture,
    render(time: number) {
      sprite(texture, time, 5, 4);
    },
  };
};
