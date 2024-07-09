import { injectSpeedInsights } from "@vercel/speed-insights";
import { GameScreen } from "./screens/game";
// import { LoadingScreen } from "./screens/loading";
import "./style.css";

injectSpeedInsights({ debug: false });

// LoadingScreen();

GameScreen();
