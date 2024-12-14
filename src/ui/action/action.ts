import classes from "./action.module.css";

type ActionArgs = {
  title: string;
  disabled?: boolean;
  onclick?(): void;
};

export const Action = ({ title, disabled = false, onclick = () => {} }: ActionArgs) => {
  const action = document.createElement("button");

  action.role = "menuitem";
  action.className = classes.action;
  action.textContent = title;
  action.disabled = disabled;

  action.onclick = onclick;

  return action;
};
