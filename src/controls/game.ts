class GameControl {
  isActive = true;

  pauseGame() {
    this.isActive = false;
  }

  resumeGame() {
    this.isActive = true;
  }
}

export const gameControl = new GameControl();
