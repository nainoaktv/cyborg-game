// =====  KEY INPUT HANDLER ===== //
/* 
- this.keys Array will read take multiple keydown values once pressed
- keyup will splice values from the array once keys are released */
export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener('keydown', e => {
      if (( e.key === 'ArrowDown' || 
            e.key === 'ArrowUp' ||
            e.key === 'ArrowRight' ||
            e.key === 'ArrowLeft' ||
            e.key === ' ' 
          ) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      } 
    });
    window.addEventListener('keyup', e => {
      if (  e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowRight' ||
            e.key === 'ArrowLeft' ||
            e.key === ' ') {
            this.keys.splice(this.keys.indexOf(e.key), 1);
            }
    });
  };
};
