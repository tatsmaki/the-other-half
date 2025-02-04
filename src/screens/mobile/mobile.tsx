import { createMediaQuery } from "@solid-primitives/media";
import { template } from "solid-js/web";
import { createJoystick } from "joystick-ui";
import "joystick-ui/dist/main.css";
import { RotateDevice } from "../rotate_device";
import { MobileScreenProps } from "./mobile.types";
import menuIcon from "/menu.svg?raw";
import classes from "./mobile.module.css";

const { joystick, joystickControl } = createJoystick();

export { joystickControl };

export const MobileScreen = (props: MobileScreenProps) => {
  const isPortrait = createMediaQuery("(orientation: portrait)");
  const isMobile = "ontouchstart" in document.documentElement;

  const onPause = (event: MouseEvent) => {
    event.stopImmediatePropagation();
    props.onPause();
  };

  return (
    <>
      {isPortrait() && <RotateDevice />}
      {isMobile && !isPortrait() && !props.isLoading() && (
        <>
          <button class={classes.menu} on:pointerdown={onPause}>
            {template(menuIcon)()}
          </button>
          {joystick}
        </>
      )}
    </>
  );
};
