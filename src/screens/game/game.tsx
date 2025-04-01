import { player } from "../../objects/player";
import { scene } from "../../objects/global/scene";
import { camera } from "../../objects/global/camera";
import { renderer } from "../../objects/global/renderer";
import { collision } from "../../objects/global/collision";
import Stats from "stats.js";
import { clock } from "../../objects/global/clock";
import { audioResources } from "../../objects/global/loader";
import { audioControl } from "../../controls/audio";
import { fallingSnow } from "../../objects/global/falling_snow";
import { gameControl } from "../../controls/game";
import { createEffect, onCleanup } from "solid-js";
import { GameProps } from "./game.types";
// import { enemy } from "../../objects/enemy/enemy";
// import { enemies } from "../../objects/global/enemies";

const stats = new Stats();
stats.showPanel(0);
stats.dom.style.left = "";
stats.dom.style.right = "0";

const animate = (time: number) => {
  stats.begin();

  const delta = clock.getDelta();

  player.render(time, delta);
  fallingSnow.render();
  // enemy.render(delta);
  renderer.render(scene, camera);

  stats.end();
};

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const onVisibilityChange = () => {
  if (!gameControl.isActive) {
    return;
  }

  if (document.visibilityState === "visible") {
    return audioControl.playBackground(audioResources.get("blizzard.wav")!);
  }

  audioControl.stopBackground();
};

export const GameScreen = (props: GameProps) => {
  createEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.code === "Escape" && gameControl.isActive) {
        props.onPause();
      }
    };

    // enemies.group.add(enemy.group);
    scene.add(
      player.group,
      collision.group
      //  enemy.group
    );

    onResize();
    renderer.setAnimationLoop(animate);
    audioControl.playBackground(audioResources.get("blizzard.wav")!);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("keydown", onKeydown);

    onCleanup(() => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("keydown", onKeydown);
    });
  });

  return (
    <>
      {renderer.domElement}
      {stats.dom}
    </>
  );
};
