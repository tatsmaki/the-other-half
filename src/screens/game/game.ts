import { player } from "../../objects/player";
import { scene } from "../../objects/global/scene";
import { camera } from "../../objects/global/camera";
import { renderer } from "../../objects/global/renderer";
import { Mobile } from "../mobile";
import { collision } from "../../objects/global/collision";
import Stats from "stats.js";
import { clock } from "../../objects/global/clock";

export const GameScreen = () => {
  const app = document.getElementById("app")!;

  Mobile();
  app.append(renderer.domElement);

  scene.add(player.group, collision.group);

  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  const animate = (time: number) => {
    stats.begin();

    const delta = clock.getDelta();

    player.render(time, delta);
    renderer.render(scene, camera);

    stats.end();
  };

  renderer.setAnimationLoop(animate);

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
};
