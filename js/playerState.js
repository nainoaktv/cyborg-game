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

export class Idle extends State {
  constructor(player) {
    super('Idle');
    this.player = player;
  }
  enter() {

  }
  handleInput() {
    
  }
}