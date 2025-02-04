import { createSignal } from "solid-js";
import classes from "./checkbox.module.css";

type CheckboxProps = {
  title: string;
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox = (props: CheckboxProps) => {
  const [checked, setChecked] = createSignal(props.defaultChecked);

  const onChange = (event: Event & { target: HTMLInputElement }) => {
    const newChecked = event.target.checked;

    setChecked(newChecked);
    props.onChange(newChecked);
  };

  return (
    <span class={classes.checkbox}>
      <label for={props.title} class={classes.label}>
        {props.title}
      </label>
      <input
        type="checkbox"
        id={props.title}
        class={classes.input}
        checked={checked()}
        on:change={onChange}
      />
      <span class={classes.label}>{checked() ? "on" : "off"}</span>
    </span>
  );
};
