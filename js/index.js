const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

// === Global Variables === //
const gravity = 0.7; // Pulls player to bottom of canvas


// === Create Sprite class to help define player and enemy properties === //
class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // if() velocity loop to stop player and enemy from falling below canvas === //
    if (this.position.y + this.height + this. velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

// === Start player object === //
const player = new Sprite({
  position: {
  x: 0,
  y: 0
},
velocity: {
  x: 0,
  y: 10
}
});

// === Start Enemy Object === //
const enemy = new Sprite({
  position: {
  x: 400,
  y: 100
},
velocity: {
  x: 0,
  y: 0
}
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
  }
}

// === Animation Loop === //
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
  }

  // Movement with Arrow Keys
  if (keys.ArrowLeft.pressed && player.lastKey === 'ArrowLeft') {
    player.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && player.lastKey === 'ArrowRight') {
    player.velocity.x = 5;
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
  }
});

