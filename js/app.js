// Score variable that can be accessed in each .js file
let score = {
  ends : 0
};
// true after player presses start button on start game panel
let isPlaying = false;

// array of character images
const characterImages = ['images/charBoy.png', 'images/charCatGirl.png', 'images/charHornGirl.png', 'images/charPinkGirl.png', 'images/charPrincessGirl.png'];

// variable to set character image
let x = 0;

// Enemies our player must avoid
class Enemy {
  constructor(sprite, x, y, speed, width, height) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    // width and height of collision box
    this.width = 80;
    this.height = 50;
  }
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 550) {
      // moves enemy back to left side of screen when they reach the right
      this.x = -120;
      // random # sets/changes row enemy is in each time they reach the right side of the screen
      let random = Math.floor((Math.random() * 4) + 1);
      if (random < 2) {
        this.y = 60;
      }
      else if (random >= 2 && random < 3) {
        this.y = 143;
      }
      else {
        this.y = 226;
      }
    }
  }

// Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(sprite, x, y, width, height) {
    this.sprite = 'images/charBoy.png';
    this.x = x;
    this.y = y;
    // width and height of collision box
    this.width = 50;
    this.height = 50;
  }

  update(dt) {
      if (this.y < 50) {
        // move player back to start when they reach water
        this.y = 400;
        // increment score when player reaches water
        document.querySelector('.score').innerHTML = ++score.ends;
      }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // move character on key press and set movement limits
  handleInput(keyPress) {
      if (keyPress === 'left' && this.x > 100) {
        this.x -= 101;
      }
      else if (keyPress === 'right' && this.x < 400) {
        this.x += 101;
      }
      else if (keyPress === 'up' && this.y > 0) {
        this.y -= 83;
      }
      else if (keyPress === 'down' && this.y < 400) {
        this.y += 83;
      }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
  let player = new Player(undefined,202,400);
  let allEnemies = [new Enemy(undefined,-125,60,400),
                    new Enemy(undefined,-120,143,300),
                    new Enemy(undefined,-130,226,200),
                    new Enemy(undefined,-135,143,100)];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(isPlaying) {
      player.handleInput(allowedKeys[e.keyCode]);
    }
});

// start game
document.querySelector('.button-start').addEventListener('click', function() {
  isPlaying = true;
  document.querySelector('.start-game-panel').style.visibility = 'hidden';
});

// change character on start game Panel
document.querySelector('.button-left').addEventListener('click', function() {
  // increment x on button click to change character
  ++x;
  // reset to 0 if x is incremented past array length
  if (x > (characterImages.length - 1)) {
    x = 0;
  }
  // change character on start game panel
  document.getElementById('character-image').src = characterImages[x];
  // change player character
  player.sprite = characterImages[x];
});

// functions like button-left
document.querySelector('.button-right').addEventListener('click', function() {
  --x;
  if (x < 0) {
    x = 4;
  }
  document.getElementById('character-image').src = characterImages[x];
  player.sprite = characterImages[x];
});

// refresh page / restart game from game over panel
document.querySelector('.button').addEventListener('click', function() {
  location.reload();
});
