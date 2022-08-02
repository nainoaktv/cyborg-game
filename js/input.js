// =====  KEY INPUT HANDLER ===== //
export class InputHandler {
  constructor() {
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
  }
}
// this.keys = []; // this will allow multiple keys to be used at simultaneously
// window.addEventListener('keydown', e => {
//   // ===== Once key is pressed it will enter array ===== //
//   if (( e.key === 'ArrowDown' || 
//         e.key === 'ArrowUp' ||
//         e.key === 'ArrowRight' ||
//         e.key === 'ArrowLeft' ||
//         e.key === ' ' 
//       ) && this.keys.indexOf(e.key) === -1) {
//     this.keys.push(e.key);
//   }
//   console.log(e.key, this.keys);
// });
// // ===== When keys are released they will be spliced from array ===== //
// window.addEventListener('keyup', e => {
//   if (  e.key === 'ArrowDown' ||
//         e.key === 'ArrowUp' ||
//         e.key === 'ArrowRight' ||
//         e.key === 'ArrowLeft' ||
//         e.key === ' ') {
//         this.keys.splice(this.keys.indexOf(e.key), 1);
//   }
//   console.log(e.key, this.keys);
// });