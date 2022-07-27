export class Player {
  constructor(game) {
    this.game = game;
    this.width = 140;
    this.height = 144;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.weight = 1;
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
    // ==== Jump/Vertical Movement by adding weight to vy === //
    if (input.includes('ArrowUp') && this.onGround()) this.vy -= 20;
    this.y += this.vy;
    if(!this.onGround()) this.vy += this.weight;
    else this.vy=0;
  }
  draw(context) {
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, 
      this.width, this.height);
  }
  onGround() {
    return this.y >= this.game.height -this.height;
  }
};