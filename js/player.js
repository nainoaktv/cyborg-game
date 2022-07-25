export class Player {
  constructor(game) {
    this.game = game;
    this.width = 35;
    this.height = 48;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = document.getElementById('player')
    this.speed = 0;
    this.maxSpeed = 2;
  }
  update(input) {
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
  }
  draw(context) {
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, 
      this.width, this.height);
  }
};