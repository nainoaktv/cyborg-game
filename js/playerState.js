// === Creating States when using multiple inputs === //
const states = {
  idle: 0,
  running: 1,
  jump: 2,
}

class State {
  constructor(state) {
    this.state = state;
  }
}

// === Transitioning between states with inputs === //
export class Idle extends State {
  constructor(player) {
    super('idle');
    this.player = player;
  }
  enter() {
    this.player.frameY = 0;
    this.player.maxFrame = 5;
  }
  handleInput(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.player.setState(states.running);
    } else if (input.includes('ArrowUp')) {
      this.player.setState(states.jump);
    }
  }
}
export class Running extends State {
  constructor(player) {
    super('running');
    this.player = player;
  }
  enter() {
    this.player.frameY = 1;
    this.player.maxFrame = 6;
  }
  handleInput(input) {
    if (input.includes('ArrowDown')) {
      this.player.setState(states.idle);
    } else if (input.includes('ArrowUp')) {
      this.player.setState(states.jump);
    } 
  }
}
export class Jump extends State {
  constructor(player) {
    super('jump');
    this.player = player;
  }
  enter() {
    if (this.player.onGround()) this.player.vy -= 25;
    this.player.frameY = 2;
    this.player.maxFrame = 0;
  }
  handleInput(input) {
    if (this.player.vy > this.player.weight) {
      this.player.setState(states.idle);
    } else if (input.includes('ArrowUp')) {
      this.player.setState(states.jump);
    }
  }
}



