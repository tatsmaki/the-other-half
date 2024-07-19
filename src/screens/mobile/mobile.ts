import classes from "./mobile.module.css";
import icon from "/rotate_device.svg?raw";
// import { Joystick } from "../joystick";

export const Mobile = () => {
  const app = document.getElementById("app")!;
  const overlay = document.createElement("div");
  const help = document.createElement("h3");

  overlay.className = classes.overlay;
  help.className = classes.help;
  help.textContent = "Please rotate your device";
  overlay.innerHTML = icon;
  overlay.append(help);

  if (screen.orientation.type.includes("portrait")) {
    app.append(overlay);
  } else {
    // Joystick();
  }

  screen.orientation.onchange = () => {
    if (screen.orientation.type.includes("landscape")) {
      overlay.remove();
    } else {
      app.append(overlay);
    }
  };
};
