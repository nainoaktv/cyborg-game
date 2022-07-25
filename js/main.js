import { Player } from './player.js';
import { InputHandler } from './input.js';
// ===== Window Event Listener so code runs when all assets are loaded ====== //


window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;

  // ============= All logic will be in Game class ================= //
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    // ===== update() will run for every animation frame and trigger calculations===== //
    update() {
      this.player.update(this.input.keys);
    }
    // ===== draw() method draw images and score ===== //
    draw(context) {
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(); 
});