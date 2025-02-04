import { RotateDevice } from "../rotate_device";
import { createMediaQuery } from "@solid-primitives/media";
import { MobileScreenProps } from "./mobile.types";
import { createJoystick } from "joystick-ui";
import "joystick-ui/dist/main.css";

const { joystick, joystickControl } = createJoystick();

export { joystickControl };

export const MobileScreen = ({ isLoading }: MobileScreenProps) => {
  const isPortrait = createMediaQuery("(orientation: portrait)");
  const isMobile = "ontouchstart" in document.documentElement;

  return (
    <>
      {isPortrait() && <RotateDevice />}
      {isMobile && !isPortrait() && !isLoading() && joystick}
    </>
  );
};
