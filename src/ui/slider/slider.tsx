import { createEffect, createSignal } from "solid-js";
import classes from "./slider.module.css";
import { SliderProps } from "./slider.types";

export const Slider = (props: SliderProps) => {
  let inputRef: HTMLInputElement | undefined;
  const [value, setValue] = createSignal(props.defaultValue || 0);

  const drawSlider = (newValue: number) => {
    inputRef?.style.setProperty("--slider-value", newValue * 100 + "%");
  };

  createEffect(() => {
    drawSlider(props.defaultValue);
  });

  const onInput = (event: InputEvent & { target: HTMLInputElement }) => {
    const newValue = +event.target.value;

    drawSlider(newValue);
    setValue(newValue);
    props.onChange(newValue);
  };

  return (
    <span class={classes.slider}>
      <label class={classes.label} for={props.title}>
        {props.title}
      </label>
      <input
        class={classes.input}
        ref={inputRef}
        type="range"
        id={props.title}
        min={0}
        max={1}
        step={0.1}
        value={value()}
        on:input={onInput}
      />
      <span class={classes.label}>{value() * 100} %</span>
    </span>
  );
};
