import { keyboardControl } from "../../controls/keyboard";
import { createPlayer } from "../../objects/player";
import { createScene } from "../../objects/scene";
import { createCamera } from "../../objects/camera";
import { createRenderer } from "./renderer";
import { createFire } from "../../objects/fire";

export const GameScreen = () => {
  const app = document.getElementById("app")!;
  const renderer = createRenderer();

  app.append(renderer.domElement);

  const scene = createScene();
  const player = createPlayer();
  const fire = createFire();
  const camera = createCamera();

  player.group.add(fire.mesh);
  scene.add(player.group);

  const animate = (time: number) => {
    const direction = keyboardControl.direction;

    player.render(direction, time);
    camera.position.add(direction);
    fire.update(camera);

    renderer.render(scene, camera);
  };

  renderer.setAnimationLoop(animate);

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
};
