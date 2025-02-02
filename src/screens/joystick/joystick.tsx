import { Vector2 } from "three";
import classes from "./joystick.module.css";
import { JoystickProps } from "./joystick.types";
import { JoystickControl } from "../../controls/joystick";

const Joystick = (props: JoystickProps) => {
  let touchRef: HTMLDivElement | undefined;
  let joystickRadius = 0;
  let thumbRadius = 0;
  const start = new Vector2();
  const end = new Vector2();

  const moveThumb = () => {
    let dx = end.x - start.x;
    let dy = end.y - start.y;

    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const radius = joystickRadius - thumbRadius;

    if (distance > radius) {
      const scale = radius / distance;

      dx = dx * scale;
      dy = dy * scale;
    }

    touchRef!.style.setProperty("--dx", dx + "px");
    touchRef!.style.setProperty("--dy", dy + "px");
    props.joystickControl.direction.set(dx, -dy);
  };

  const onPointerMove = (event: PointerEvent) => {
    end.set(event.clientX, event.clientY);

    moveThumb();
  };

  const onPointerUp = () => {
    start.set(0, 0);
    end.set(0, 0);
    moveThumb();

    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
    touchRef!.style.transition = "transform 0.1s";
  };

  const onTouchStart = (event: TouchEvent) => {
    const [touch] = event.touches;
    const rect = touchRef!.getBoundingClientRect();

    thumbRadius = rect.width / 2;
    joystickRadius = touchRef!.parentElement!.clientWidth / 2;
    start.set(rect.x + thumbRadius, rect.y + thumbRadius);
    end.set(touch.clientX, touch.clientY);
    moveThumb();

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    touchRef!.style.transition = "none";
  };

  return (
    <div class={classes.joystick} on:touchstart={onTouchStart}>
      <div ref={touchRef} class={classes.thumb} />
    </div>
  );
};

export const createJoystick = () => {
  const joystickControl = new JoystickControl();
  const joystick = <Joystick joystickControl={joystickControl} />;

  return {
    joystick,
    joystickControl,
  };
};
