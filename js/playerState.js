// === Creating States when using multiple inputs === //
const states = {
  Idle: 0,
  Running: 1,
  Jump: 2,
}

class State {
  constructor(state) {
    this.state = state;
  }
}

// === Transitioning between states with inputs === //
export class Idle extends State {
  constructor(player) {
    super('Idle');
    this.player = player;
  }
  enter() {
    this.player.frameY = 0;
  }
  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.player.setState(states.Running);
    }
  }
}
export class Running extends State {
  constructor(player) {
    super('Running');
    this.player = player;
  }
  enter() {
    this.player.frameY = 1;
  }
  handleInput(input) {
    if (input.includes('ArrowDown')) {
      this.player.setState(states.Idle);
    }
  }
}


