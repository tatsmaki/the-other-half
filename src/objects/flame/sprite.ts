import { RepeatWrapping, Texture } from "three";
import { renderSprite } from "../../utils/sprite";
import { textureLoader } from "../global/texture_loader";

const flame = textureLoader.load("WhiteFlameLick.png");

flame.wrapS = RepeatWrapping;
flame.wrapT = RepeatWrapping;
// flame.center.x = 0.005;
// flame.center.y = 0.015;

const render = (time: number, texture: Texture) => {
  renderSprite({ texture, time, th: 5, tv: 5 });
};

export const sprite = { flame, render };
