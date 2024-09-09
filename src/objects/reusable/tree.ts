import { collision } from "../global/collision";
import { gltfLoader } from "../global/loader";
import { scene } from "../global/scene";
import { createBox } from "./box";

export const createTree = () => {
  gltfLoader.load("/tree.glb", (gltf) => {
    gltf.scene.scale.set(0.2, 0.2, 0.2);
    gltf.scene.rotation.x = Math.PI / 2;
    gltf.scene.position.set(-1, 1, 0);

    const box = createBox();

    box.position.copy(gltf.scene.position);
    collision.group.add(box);

    gltf.scene.traverse((node) => {
      node.castShadow = true;
    });

    scene.add(gltf.scene);
  });
};
