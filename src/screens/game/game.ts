import { keyboardControl } from "../../controls/keyboard";
import { createPlayer } from "../../objects/player";
import { createScene } from "../../objects/scene";
import { createCamera } from "../../objects/camera";
import { createRenderer } from "./renderer";

export const GameScreen = () => {
  const app = document.getElementById("app")!;
  const renderer = createRenderer();

  app.append(renderer.domElement);

  const scene = createScene();
  const player = createPlayer();
  const camera = createCamera();

  player.group.add(camera);
  scene.add(player.group);

  const animate = () => {
    player.render(keyboardControl.direction);
    renderer.render(scene, camera);
  };

  renderer.setAnimationLoop(animate);

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
};
