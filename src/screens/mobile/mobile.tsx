import { createJoystick } from "../joystick";
import { RotateDevice } from "../rotate_device";
import { createMediaQuery } from "@solid-primitives/media";
import { MobileScreenProps } from "./mobile.types";

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
