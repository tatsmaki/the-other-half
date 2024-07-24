import { RepeatWrapping } from "three";
import { RenderSpriteArgs, renderSprite, resetSprite } from "../../utils/sprite";
import { material } from "./material";
import { textureLoader } from "../global/texture_loader";

const idle = textureLoader.load("idle.png");

idle.wrapS = RepeatWrapping;
idle.wrapT = RepeatWrapping;
idle.center.x = 0.007;
idle.center.y = 0.022;

const run = textureLoader.load("run.png");

run.wrapS = RepeatWrapping;
run.wrapT = RepeatWrapping;
run.center.x = 0.005;
run.center.y = 0.015;

const render = ({ texture, time, th, tv }: RenderSpriteArgs) => {
  if (material.map !== texture) {
    material.map = texture;
    resetSprite(time);
  }

  renderSprite({ texture, time, th, tv });
};

export const sprite = { idle, run, render };
