import { injectSpeedInsights } from "@vercel/speed-insights";
import { GameScreen } from "./screens/game/game";
// import { LoadingScreen } from "./screens/loading";
import "./style.css";

injectSpeedInsights();

// LoadingScreen();

GameScreen();
