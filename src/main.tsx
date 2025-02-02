import { render } from "solid-js/web";
import { App } from "./app";
import "./style.css";

const root = document.getElementById("app");

render(() => <App />, root!);
