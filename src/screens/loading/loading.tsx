import { createEffect, createSignal } from "solid-js";
import { loadAudio, loadingManager } from "../../objects/global/loader";
import classes from "./loading.module.css";
import { LoadingScreenProps } from "./loading.types";

export const LoadingScreen = (props: LoadingScreenProps) => {
  const [progress, setProgress] = createSignal(0);
  const [isReady, setIsReady] = createSignal(false);

  createEffect(() => {
    loadingManager.onProgress = (_url, loaded, total) => {
      const progress = (loaded / total) * 100;

      setProgress(+progress.toFixed());
    };

    loadingManager.onLoad = () => {
      setIsReady(true);
    };

    loadAudio();
  });

  return (
    <>
      {isReady() && (
        <div class={classes.loading} on:click={props.onLoad}>
          <h1>Please wait</h1>
          <span>Click anywhere to continue</span>
        </div>
      )}
      {!isReady() && (
        <div class={classes.loading}>
          <h1>Please wait</h1>
          <span>{progress()} %</span>
        </div>
      )}
    </>
  );
};
