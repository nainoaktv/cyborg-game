import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { Alien } from './enemy.js';

// === All Logic will be called within the Game Class === //

/* 
- Use module JavaScript type to help with cleaner code .
- Update methods from other JavaScript files will be called in the Game Class.
- Load Event listener called to ensure all assets are loaded before running game.
- Imported JS files up top
- Animate function (game loop) will be using deltaTime & animationFrames to run game */

window.addEventListener('load', function() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 800;
  canvas.height = 720;
  
  class Game { 
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.alien = new Alien(this);
      this.aliens = []; 
      this.alienTimer = 0;
      this.alienInterval = 1000;
    };
    // ===== update() will run for every animation frame and trigger calculations===== //
    update(deltaTime) {
    // === update background and player animation === //
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      
      // Aliens appear at different intervals
      if (this.alienTimer > this.alienInterval) {
        this.addAlien(game);
        this.alienTimer = 0;
      } else {
        this.alienTimer += deltaTime;
      };

      this.aliens.forEach(enemy => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion) this.aliens.splice(this.aliens.indexOf(enemy), 1);
        if (enemy.markedForDeletion) {
          const score = document.getElementById('score-counter');
          let newScore = Number(score.textContent) + 1;
          score.textContent = newScore;
        };
      });
    };
    // ===== draw() method draw images and score ===== //
    draw(context) {
      // === place background behind player === //
      this.background.draw(context); 
      this.player.draw(context);
      this.aliens.forEach(enemy => {
        enemy.draw(context);
      });
    };
    addAlien(){
      this.aliens.push(new Alien(this));
      console.log(this.aliens);
    };
  };
  
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  };
  animate(0); 
});
