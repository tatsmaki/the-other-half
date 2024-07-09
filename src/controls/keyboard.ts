import { Vector3 } from "three";

class KeyboardControl {
  private w = false;
  private a = false;
  private s = false;
  private d = false;

  constructor() {
    document.onkeydown = (event) => {
      switch (event.code) {
        case "KeyW": {
          this.w = true;
          break;
        }
        case "KeyA": {
          this.a = true;
          break;
        }
        case "KeyS": {
          this.s = true;
          break;
        }
        case "KeyD": {
          this.d = true;
          break;
        }
        default: {
          break;
        }
      }
    };

    document.onkeyup = (event) => {
      switch (event.code) {
        case "KeyW": {
          this.w = false;
          break;
        }
        case "KeyA": {
          this.a = false;
          break;
        }
        case "KeyS": {
          this.s = false;
          break;
        }
        case "KeyD": {
          this.d = false;
          break;
        }
        default: {
          break;
        }
      }
    };
  }

  get direction() {
    const x = -this.a + +this.d;
    const y = +this.w - +this.s;

    return new Vector3(x, y, 0);
  }
}

export const keyboardControl = new KeyboardControl();
