import { player } from "../../objects/player";
import { scene } from "../../objects/global/scene";
import { camera } from "../../objects/global/camera";
import { renderer } from "../../objects/global/renderer";
// import { Mobile } from "../mobile";
import { collision } from "../../objects/global/collision";

export const GameScreen = () => {
  const app = document.getElementById("app")!;

  app.append(renderer.domElement);

  scene.add(player.group, collision.group);

  const animate = (time: number) => {
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
