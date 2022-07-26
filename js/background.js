// === Creating side moving background === //
/* 
- Far, Mid, & Foregrund layers will be given speed modifiers
to create moving background illusion. */
class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1670;
    this.height = 720;
    this.layer3img = document.getElementById('layer3'); // Foreground Layer
    this.layer2img = document.getElementById('layer2'); // Middle Layer
    this.layer1img = document.getElementById('layer1'); // Far Layer
    this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3img);
    this.layer2 = new Layer(this.game, this.width, this.height, 0.5, this.layer2img);
    this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layer1img);
    this.backgroundLayer = [this.layer3, this.layer2, this.layer1];
  }
  update() {
    this.backgroundLayer.forEach(layer => {
      layer.update();
    });
  }
  draw(context) {
    this.backgroundLayer.forEach(layer => {
      layer.draw(context);
    })
  }
}