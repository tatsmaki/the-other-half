import classes from "./slider.module.css";

type SliderArgs = {
  title: string;
  defaultValue?: number;
  onchange(event: ChangeEvent): void;
};

export const Slider = ({ title, defaultValue = 0, onchange }: SliderArgs) => {
  const slider = document.createElement("span");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const value = document.createElement("span");

  label.textContent = title;
  label.htmlFor = title;
  label.className = classes.label;

  input.type = "range";
  input.id = title;
  input.min = String(0);
  input.max = String(1);
  input.step = String(0.1);
  input.defaultValue = String(defaultValue);
  input.className = classes.input;

  const updateValue = (newValue: number) => {
    input.style.setProperty("--slider-value", newValue * 100 + "%");
    value.textContent = String(newValue * 100);
  };

  updateValue(defaultValue);

  input.oninput = (event) => {
    const typedEvent = event as ChangeEvent;

    updateValue(+typedEvent.target.value);
    onchange(typedEvent);
  };

  value.className = classes.label;

  slider.className = classes.slider;
  slider.append(label, input, value);

  return slider;
};
