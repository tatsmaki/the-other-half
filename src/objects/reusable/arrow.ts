import { ArrowHelper, Vector3 } from "three";

export const createArrow = (length = 0.5, color = 0xe9724f) => {
  const mesh = new ArrowHelper(new Vector3(), new Vector3(), length, color);

  return {
    mesh,
    render(direction: Vector3) {
      mesh.setDirection(direction);
    },
  };
};
