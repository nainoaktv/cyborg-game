import { Idle, Running, Jump } from './playerState.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 150;
    this.height = 150;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.gravity = 2;
    this.weight = 1;
    this.image = document.getElementById('player')
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 3;
    this.maxFrame; // Used to smoothly cycle through frames on X for playerState
    this.fps = 30;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.states = [new Idle(this), new Running(this), new Jump(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
    this.isAttacking;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 150,
      height: 150
    }
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);
    
    // ==== Horizontal Movement ==== //
    this.x += this.speed;
    if (input.includes('ArrowRight'))  this.speed = this.maxSpeed;
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else this.speed = 0;

    // === Prevent Player from moving out of canvas LEFT side ==== //
    if (this.x < 0) this.x = 0;

    // === Prevent Player from moving out of canvas RIGHT side ==== //
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

    // ==== Jump/Vertical Movement by adding weight to vy === //
    // if (input.includes('ArrowUp') && this.onGround()) this.vy -= 25;
    this.y += this.vy;
    if(!this.onGround()) this.vy += this.weight;
    else this.vy=0;

    // === Sprite Animation === //
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  };

  draw(context) {
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
       this.x, this.y, this.width, this.height);
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  onGround() {
    return this.y >= this.game.height -this.height;
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
};