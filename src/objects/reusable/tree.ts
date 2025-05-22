import { Mesh, ShaderMaterial } from "three";
import { collision } from "../global/collision";
import { gltfLoader } from "../global/loader";
import { scene } from "../global/scene";
import { createBox } from "./box";
import treeVert from "../../shaders/tree.vert?raw";
import treeFrag from "../../shaders/tree.frag?raw";

const noiseShader = {
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: treeVert,
  fragmentShader: treeFrag,
};

export const createTree = () => {
  gltfLoader.load("/tree.glb", (gltf) => {
    gltf.scene.scale.set(0.2, 0.2, 0.2);
    gltf.scene.rotation.x = Math.PI / 2;
    gltf.scene.position.set(-1, 1, 0);

    const box = createBox();

    box.position.copy(gltf.scene.position);
    collision.group.add(box);

    const treeMat = new ShaderMaterial(noiseShader);

    gltf.scene.traverse((node) => {
      if (node instanceof Mesh) {
        node.material = treeMat;
      }
      node.castShadow = true;
    });

    scene.add(gltf.scene);
  });
};
