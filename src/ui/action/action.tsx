import classes from "./action.module.css";
import { ActionProps } from "./action.types";

export const Action = (props: ActionProps) => {
  return (
    <button
      role="menuitem"
      class={classes.action}
      disabled={props.disabled}
      on:click={props.onClick}
    >
      {props.title}
    </button>
  );
};
