// =====  KEY INPUT HANDLER ===== //
export class InputHandler {
  constructor() {
    this.keys = []; // this will allow multiple keys to be used at simultaneously
    window.addEventListener('keydown', e => {
      // ===== Once key is pressed it will enter array ===== //
      if (( e.key === 'ArrowDown' || 
            e.key === 'ArrowUp' ||
            e.key === 'ArrowRight' ||
            e.key === 'ArrowLeft' ||
            e.key === ' ' 
          ) && this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      }
      console.log(e.key, this.keys);
    });
    // ===== When keys are released they will be spliced from array ===== //
    window.addEventListener('keyup', e => {
      if (  e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowRight' ||
            e.key === 'ArrowLeft' ||
            e.key === ' ') {
            this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      console.log(e.key, this.keys);
    });
  }
}