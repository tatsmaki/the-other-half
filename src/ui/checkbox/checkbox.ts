import classes from "./checkbox.module.css";

type CheckboxArgs = {
  title: string;
  defaultChecked?: boolean;
  onchange(event: Event): void;
};

export const Checkbox = ({ title, defaultChecked = false, onchange }: CheckboxArgs) => {
  const checkbox = document.createElement("span");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const value = document.createElement("span");

  label.textContent = title;
  label.htmlFor = title;
  label.className = classes.label;

  input.type = "checkbox";
  input.id = title;
  input.defaultChecked = defaultChecked;
  input.className = classes.input;
  input.onchange = (event) => {
    onchange(event);
  };

  value.className = classes.label;
  value.textContent = defaultChecked ? "on" : "off";

  checkbox.append(label, input, value);
  checkbox.className = classes.checkbox;

  return checkbox;
};
