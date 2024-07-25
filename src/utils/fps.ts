let frames: number[] = [];
let prevFrameTime = 0;

export const fps = (time: number, counter: HTMLElement) => {
  frames.push(time);

  if (time - prevFrameTime > 1000) {
    prevFrameTime = time;

    counter.textContent = String(frames.length);
    // console.log(frames.length);

    frames = [];
  }
};
