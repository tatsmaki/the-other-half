class MouseControl {
  isActive = false;
  x = 0;
  y = 0;

  constructor() {
    document.onmousedown = () => {
      this.isActive = true;
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
  }
}

export const mouseControl = new MouseControl();
