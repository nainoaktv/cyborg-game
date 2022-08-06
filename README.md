# Hambāgu Game
General Assembly Project 1
# Click Link Below to Play
[Hambāgu](https://nainoaktv.github.io/cyborg-game/)
# Technologies
- HTML5
- CSS3
- JavaScript ES6
# About the Game
1. The purpose of the game is to avoid the Aliens by jumping over them.  
2. Aliens will spawn at random intervals once the page loads.
3. Choose the timing of all your jumps wisely or it's game over!
4. Points are earned for each Alien that's avoided.
5. Attempt to beat your personal records.
6. Refresh the page to play again.

# Project Requirements
Your app must:
- Display a game in the browser. </br>
[x]Game Displayed.

- Switch turns between two players, or have the user play the computer (AI or obstacles).</br>
[x]Enemy Obstacles spawning at random intervals.

- Design logic for winning & visually display which player won.</br>
[x]Winning is beating your personal record.

- Include separate HTML / CSS / JavaScript files.</br>
[x]HTML CSS & JavaScript in respective files.

- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles.</br>
[x]Cleaned up code by using repetitive code as methods or functions.

- Use Javascript for DOM manipulation.</br>
[x]DOM Manipulation used on Player Sprites, Enemy Sprites, Background Layers, and Event Listeners.  

- Deploy your game online, where the rest of the world can access it.</br>
[x]Game Deployed using GitHub Pages.

- Use semantic markup for HTML and CSS (adhere to best practices).</br>
[x]Checked for missing semi colons and clean tabs for each line of code.

# Wireframe
![updated-wireframe](./wireframe/Wireframe%20Updated.png)

## Load Event, Game Class, & Animate(deltaTime)
``` 
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

    update(deltaTime) {

      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      
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
        }
      });
    };

    draw(context) {
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
```
- Game class is within a 'load' Event Listener. This will allow the game to run once all assets within the Event Listener has loaded successfully.
- By using JavaScript modules I was able to import and export multiple JS files into my main.js which helped with keeping my code organized. Once the files were imported I was able to call them within the constructor and create new instances for all the classes I needed.
- All Logic was put into the Game class and the game is animated with function animate.

# Multiple Key Input Handler
```
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
```
- To utilize multiple keys at once all keydown events were placed into an array.
- When players stop pressing a key, that key is then spliced from the array.
# Screenshot
![hambagu-screenshot](./wireframe/Screen%20Shot%202022-08-06%20at%202.56.37%20AM.png)
# Future Plans
![project1-brainstorm](https://user-images.githubusercontent.com/105531873/181154802-ef6aaebf-3432-4901-8b12-be2acf70ac7d.png)
I plan to refactor this game to bring my original idea to life.<br/>
Due to different dimensions for the current Player Sprite PNG I was unable to turn this game into the action game that I wanted. Animations and frames were cutting out causing the game to break entirely. This left me no choice but to change the objective.<br/>

# Credits
- Music: Closer to Death by [Orhan Yilmaz](https://snapmuse.com/artist/orhan-yilmaz)
- Swordsman Sprite by [Overcrafted](https://cubebrush.co/overcrafted)
- Cyberpunk Street Environment by [Ansimuz](https://ansimuz.itch.io/)
- Alien Burger Sprite by [Bevouliin](https://bevouliin.com/)