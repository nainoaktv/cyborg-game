import { Idle, Running } from './playerState.js';
export class Player {
  constructor(game) {
    this.game = game;
    this.width = 140;
    this.height = 150;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById('player')
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 2;
    this.states = [new Idle(this), new Running(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
  }
  update(input) {
    this.currentState.handleInput(input);
    // ==== Horizontal Movement ==== //
    this.x += this.speed;
    if (input.includes('ArrowRight'))  this.speed = this.maxSpeed;
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else if (input.includes('d')) this.speed = this.maxSpeed;
    else if (input.includes('a')) this.speed = -this.maxSpeed;
    else this.speed = 0;
    // === Prevent Player from moving out of canvas LEFT side ==== //
    if (this.x < 0) this.x = 0;
    // === Prevent Player from moving out of canvas RIGHT side ==== //
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    // ==== Jump/Vertical Movement by adding weight to vy === //
    if (input.includes('ArrowUp') && this.onGround()) this.vy -= 25;
    this.y += this.vy;
    if(!this.onGround()) this.vy += this.weight;
    else this.vy=0;
  }
  draw(context) {
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
       this.x, this.y, this.width, this.height);
  }
  onGround() {
    return this.y >= this.game.height -this.height;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
};