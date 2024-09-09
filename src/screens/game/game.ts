import { player } from "../../objects/player";
import { scene } from "../../objects/global/scene";
import { camera } from "../../objects/global/camera";
import { renderer } from "../../objects/global/renderer";
import { Mobile } from "../mobile";
import { collision } from "../../objects/global/collision";
import Stats from "stats.js";
import { clock } from "../../objects/global/clock";
import { audioResources } from "../../objects/global/loader";
import { audioControl } from "../../controls/audio";
import { fallingSnow } from "../../objects/global/falling_snow";

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
    fallingSnow.render();
    renderer.render(scene, camera);

    stats.end();
  };

  renderer.setAnimationLoop(animate);

  audioControl.playBackground(audioResources.get("blizzard.wav")!);

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      audioControl.playBackground(audioResources.get("blizzard.wav")!);
    } else {
      audioControl.stopBackground();
    }
  });
};
