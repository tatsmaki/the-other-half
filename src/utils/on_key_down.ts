export const onKeyDown = (callback: (event: KeyboardEvent) => void) => {
  document.addEventListener("keydown", callback);

  return () => {
    document.removeEventListener("keydown", callback);
  };
};
