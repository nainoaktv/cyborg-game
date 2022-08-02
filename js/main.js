import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
// ===== Window Event Listener so code runs when all assets are loaded ====== //


window.addEventListener('load', function() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 1024;
  canvas.height = 576;

  const gravity = 0.7;
  // ============= All logic will be in Game class ================= //
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.speed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    // ===== update() will run for every animation frame and trigger calculations===== //
    update(deltaTime) {
    // === update background and player animation === //
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
    }
    // ===== draw() method draw images and score ===== //
    draw(context) {
      // === place background behind player === //
      this.background.draw(context); 
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(); 
});
