// === Global Variables === //
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const enemyCounter = document.querySelector('#enemy-number');
const livesCounter = document.querySelector('#lives-number');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = .7; // Pulls player to bottom of canvas

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './assets/background/bigstreet.png'
});

// === Player object to be given its own properties === //
const player = new Player({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './assets/character/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 180
  },
  sprites: {
    idle: {
      imageSrc: './assets/character/Idle.png',
      framesMax: 8,
    },
    run: {
      imageSrc: './assets/character/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './assets/character/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: './assets/character/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: './assets/character/Attack1.png',
      framesMax: 6,
    }
  },
    attackBox: {
      offset: {
        x: 100,
        y: 45
      },
      width: 160,
      height: 50
   }
});


// === Enemy Object to be given its own properties === //
const enemy1 = new Player({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: -100,
    y: 250
  },
  color: 'blue',
  imageSrc: './assets/enemy/demon-idle.png',
  framesMax: 6,
  sprites: {
    idle: {
      imageSrc: './assets/enemy/demon-idle.png',
      framesMax: 6,
    }
  },
  attackBox: {
    offset: {
      x: -100,
      y: 45
    },
    width: 160,
    height: 50
 }

});


// === Keys Object to defaulted to false === //
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


// === ANIMATION LOOP START === //

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  enemy1.update();

  // Default player Velocity to 0
  player.velocity.x = 0;
  
  // Movement with WASD and Arrows
  if (
    keys.a.pressed && player.lastKey === 'a' ||
    keys.ArrowLeft.pressed && player.lastKey === 'ArrowLeft'
    ) {
    player.velocity.x = -5;
    player.switchSprite('run');
  } else if (
    keys.d.pressed && player.lastKey === 'd' || 
    keys.ArrowRight.pressed && player.lastKey === 'ArrowRight'
    ) {
    player.velocity.x = 5;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  };

  // Jump Sprite Switch
  if (player.velocity.y < 0) {
    player.switchSprite('jump');
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall');
  }

  // Collision Detection 
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy1
    }) &&
    player.isAttacking && player.framesCurrent === 4
  ) {
    player.isAttacking = false;
    let newCount = Number(enemyCounter.textContent) - 1;
    enemyCounter.textContent = newCount;
    if (newCount === 0) alert('Wave Cleared');
  }; 

  // Detect missed attack
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  };

  if (
    rectangularCollision({
      rectangle1: enemy1,
      rectangle2: player
    }) &&
    enemy1.isAttacking
  ) {
    enemy1.isAttacking = false;
    let newLives = Number(livesCounter.textContent) - 1;
    livesCounter.textContent = newLives;
    if(newLives === 0) alert('Game Over');
  };

};

animate();
// === ANIMATION LOOP END === //



// === EVENT LISTENERS START === //
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
      enemy1.isAttacking = true;
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
// === EVENT LISTENERS END === //


