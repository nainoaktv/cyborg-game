/* @TODO: Update alien so that multiple enemies spawn as obstacles */
export class Alien {
  constructor(game) {
    this.game = game;
    this.width = 140;
    this.height = 150;
    this.image = document.getElementById('alien-image');
    this.x = this.game.width + Math.random() * 1000 + 500;
    this.y = this.game.height - this.height;
    this.maxFrame = 1; 
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.speedX = 3;
    this.speedY = 0;
    this.markedForDeletion = false; 
  }
  
  update(deltaTime) {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width /  2, 0, Math.PI * 2);
    // Uncomment to show circle for collision
    // context.stroke();
    context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
};