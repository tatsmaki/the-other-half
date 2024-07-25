import { player } from "../../objects/player";
import { scene } from "../../objects/global/scene";
import { camera } from "../../objects/global/camera";
import { renderer } from "../../objects/global/renderer";
import { Mobile } from "../mobile";
import { collision } from "../../objects/global/collision";
import { fps } from "../../utils/fps";
import classes from "./game.module.css";

export const GameScreen = () => {
  const app = document.getElementById("app")!;
  const counter = document.createElement("div");

  Mobile();
  counter.className = classes.fps;
  app.append(renderer.domElement, counter);

  scene.add(player.group, collision.group);

  const animate = (time: number) => {
    fps(time, counter);
    player.render(time);
    renderer.render(scene, camera);
  };

  renderer.setAnimationLoop(animate);

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
};
