import { Vector3 } from "three";

class MouseControl {
  isActive = false;
  private x = 0;
  private y = 0;

  constructor() {
    document.onmousedown = (event: MouseEvent) => {
      this.isActive = true;
      this.x = event.clientX;
      this.y = event.clientY;
    };

    document.onmousemove = (event: MouseEvent) => {
      if (this.isActive) {
        this.x = event.clientX;
        this.y = event.clientY;
      }
    };

    document.onmouseup = () => {
      this.isActive = false;
    };

    document.oncontextmenu = () => {
      this.isActive = false;
    };
  }

  get projection() {
    const dx = (this.x / window.innerWidth) * 2 - 1;
    const dy = (this.y / window.innerHeight) * -2 + 1;

    return new Vector3(dx, dy, 1);
  }
}

export const mouseControl = new MouseControl();
