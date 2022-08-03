export class Alien {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 150;
    this.image = document.getElementById('enemy');
    this.x = this.game.width;
    this.y = this.game.height - this.height;
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
  }
  update() {
    this.x--;
  }
  draw(context) {
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
};