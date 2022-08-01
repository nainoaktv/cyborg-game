
// === Create Sprite class to help define player and enemy properties === //
/* 
- draw() method will be called to fill Sprite context and Attack Box 
- update() method will be called to define Sprite position and gravity to prevent characters from falling
below the canvas.
- attack() method to prevent constant hit detection until key is pressed */

class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 1;
  };
  draw() {
    ctx.drawImage(
      this.image, 
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x, 
      this.position.y, 
      (this.image.width / this.framesMax) * this.scale, 
      this.image.height * this.scale
      );
  };
  update() {
    this.draw();
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0;
      }
    }
      
  };
};


class Player {
  constructor({ position, velocity, color = 'red', offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },

      offset,

      width: 100,
      height: 50
    }
    this.color = color;
    this.isAttacking;
  };
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    /* Attack Box 
    - if() loop so that if player isAttacking then collision box will appear on keypress */
    if (this.isAttacking) {
    ctx.fillStyle = 'green';
    ctx.fillRect(
      this.attackBox.position.x, 
      this.attackBox.position.y, 
      this.attackBox.width, 
      this.attackBox.height)
    }
  };
  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // if() velocity loop to stop player and enemy from falling below canvas === //
    if (this.position.y + this.height + this. velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  };
  
  // === Attacking Method === //
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  };
};
