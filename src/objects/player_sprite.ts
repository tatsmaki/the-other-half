import { MeshBasicMaterial, RepeatWrapping, TextureLoader } from "three";
import { renderSprite, resetSprite } from "../utils/sprite";

const textureLoader = new TextureLoader();

export const createIdleSprite = (material: MeshBasicMaterial) => {
  const texture = textureLoader.load("Idle.png");

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.center.x -= 0.007;
  texture.center.y -= 0.022;

  return {
    texture,
    render(time: number) {
      if (material.map !== texture) {
        material.map = texture;
        resetSprite(time);
      }

      renderSprite({ texture, time, th: 4, tv: 3 });
    },
  };
};

export const createRunSprite = (material: MeshBasicMaterial) => {
  const texture = textureLoader.load("Run.png");

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.center.x -= 0.005;
  texture.center.y -= 0.015;

  return {
    texture,
    render(time: number) {
      if (material.map !== texture) {
        material.map = texture;
        resetSprite(time);
      }

      renderSprite({ texture, time, th: 5, tv: 4 });
    },
  };
};
