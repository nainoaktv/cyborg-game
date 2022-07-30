const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

// === Global Variables === //
const gravity = 0.7; // Pulls player to bottom of canvas


// === Create Sprite class to help define player and enemy properties === //
/* 
- draw() method will be called to fill Sprite context and Attack Box 
- update() method will be called to define Sprite position and gravity to prevent characters from falling
below the canvas.
- attack() method to prevent constant hit detection until key is pressed */
class Sprite {
  constructor({ position, velocity, color = 'red', offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey
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
  }
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
  }
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
  }
  
  // === Attacking Method === //
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

// === Player object to be given its own properties === //
const player = new Sprite({
  position: {
  x: 0,
  y: 0
},
velocity: {
  x: 0,
  y: 10
},
offset: {
  x: 0,
  y: 0
}
});

// === Enemy Object to be given its own properties === //
const enemy = new Sprite({
  position: {
  x: 400,
  y: 100
},
velocity: {
  x: 0,
  y: 0
},
offset: {
  x: -50,
  y: 0
},
color: 'blue'
});

// === Keys Object to control game === //
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  }
};

/* Animation Loop 
- fill canvas context 
- update enemy and player using method 
- Default player Velocity
- if loops to allow multiple key presses and reads last key input 
- Detect collision
- Refactor collision code to look cleaner */
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
};

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  // === Default player Velocity to 0 === //
  player.velocity.x = 0;
  
  // Movement with WASD
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  };

  // Movement with Arrow Keys
  if (keys.ArrowLeft.pressed && player.lastKey === 'ArrowLeft') {
    player.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && player.lastKey === 'ArrowRight') {
    player.velocity.x = 5;
  };

  // === Collision Detection === //
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    console.log('hit');
  }

  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    console.log('damage taken');
  }

}

animate();

// === Event Listeners to move player === //

// Keydown
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      player.velocity.y = -20;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      player.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      player.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      player.velocity.y = -20;
      break;
    case ' ':
      player.attack();
      break;
    case 'ArrowDown':
      enemy.isAttacking = true;
      break;
  }
});

// Keyup
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
      case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowDown':
      keys.ArrowDown.pressed = false;
      break;
  }
});

