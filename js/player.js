import { Idle, Running, Jump } from './playerState.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 150;
    this.height = 150;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById('player') 
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 5;
    this.maxFrame; // Used to smoothly cycle through frames on X for playerState
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.states = [new Idle(this), new Running(this), new Jump(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
  };
  update(input, deltaTime) {
    this.collisionDetection();
    this.currentState.handleInput(input);

    // Horizontal Movement with Arrow Keys
    this.x += this.speed;
    if (input.includes('ArrowRight'))  this.speed = this.maxSpeed;
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else this.speed = 0;

    // Left Canvas Barrier
    if (this.x < 0) this.x = 0;

    // Right Canvas Barrier
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

    // Jump + Vertical Movement with weight property
    if (input.includes('ArrowUp') && this.onGround()) this.vy -= 9;
    this.y += this.vy;
    if(!this.onGround()) this.vy += this.weight;
    else this.vy = 0;

    // Sprite Animation conditionals
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    };
  };

  draw(context) {
    // Circular Collision Check
    context.strokeStyle = 'transparent';
    context.beginPath();
    context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
    context.stroke();
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height,
       this.x, this.y, this.width, this.height);
  };

  onGround() {
    return this.y >= this.game.height - this.height;
  };

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  };

  collisionDetection() {
    const startDiv = document.getElementById('start-game');
    const gameOver = document.getElementById('game-over');
    const canvas = document.querySelector('canvas');
    this.game.aliens.forEach(enemy => {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < enemy.width / 2 + this.width / 3) {
        startDiv.style.display = 'none';
        gameOver.style.display = 'block';
        window.setTimeout(callback, 1000);
      }
    });
  };
};