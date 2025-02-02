import { template } from "solid-js/web";
import classes from "./rotate_device.module.css";
import rotateDeviceIcon from "/rotate_device.svg?raw";

export const RotateDevice = () => {
  return (
    <div class={classes.rotate}>
      <h3 class={classes.text}>Please rotate your device</h3>
      {template(rotateDeviceIcon)()}
    </div>
  );
};
