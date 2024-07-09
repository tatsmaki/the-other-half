import classes from "./joystick.module.css";

export const Joystick = () => {
  const app = document.getElementById("app")!;
  const joystick = document.createElement("div");
  const thumb = document.createElement("div");

  joystick.className = classes.joystick;
  thumb.className = classes.thumb;
  joystick.append(thumb);
  app.append(joystick);

  joystick.ontouchstart = (event) => {
    const touch = event.touches[0];

    const rect = joystick.getBoundingClientRect();
    thumb.style.top = touch.clientY - rect.top + "px";
    thumb.style.left = rect.left - touch.clientX + "px";
  };

  joystick.ontouchmove = (event) => {
    event.preventDefault();

    const touch = event.touches[0];

    console.log(touch);
    // thumb.style.top = touch.clientY + "px";
    // thumb.style.left = touch.clientX + "px";
  };

  joystick.ontouchend = () => {
    thumb.style.top = "50%";
    thumb.style.left = "50%";
  };
};
