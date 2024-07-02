import { ArrowHelper, Vector3 } from "three";

export const createArrowHelper = (length = 0.5) => {
  const mesh = new ArrowHelper(new Vector3(), new Vector3(), length, 0xffff00);

  return {
    mesh,
    render(direction: Vector3) {
      mesh.setDirection(direction.clone().normalize());
    },
  };
};
