import GameCharacter from './GameCharacter.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const sprites = {};

let screenWidth = 1000;
let screenHeight = 500;
let width = 50;
let isGameLive = true;

const enemies = [
  new GameCharacter(200, 225, width, width, 'rgb(0, 0, 255)', 2, screenHeight),
  new GameCharacter(
    450,
    screenHeight - 100,
    width,
    width,
    'rgb(0, 0, 255)',
    3,
    screenHeight
  ),
  new GameCharacter(700, 50, width, width, 'rgb(0, 0, 255)', 4, screenHeight),
];

const player = new GameCharacter(
  50,
  200,
  width,
  width,
  'rgb(0, 255, 0)',
  0,
  screenHeight
);

const goal = new GameCharacter(
  screenWidth - width,
  200,
  width,
  100,
  'rgb(0,0,0)',
  0,
  screenHeight
);

const loadSprites = function () {
  // player
  sprites.player = new Image();
  sprites.player.src = 'images/hero.png';
  // background
  sprites.background = new Image();
  sprites.background.src = 'images/grass-background.jpg';
  // enemy
  sprites.enemy = new Image();
  sprites.enemy.src = 'images/enemy.png';
  // goal
  sprites.goal = new Image();
  sprites.goal.src = 'images/chest.png';
};

// keypress move character
document.onkeydown = function (event) {
  let keyPressed = event.key;
  if (keyPressed == 'ArrowRight') {
    player.speed = player.maxSpeed;
  } else if (keyPressed == 'ArrowLeft') {
    player.speed = -player.maxSpeed;
  }
};

// reset speed to stop player moving
document.onkeyup = function (event) {
  player.speed = 0;
};

/*
 * Collision detection
 */
const checkCollisions = function (rect1, rect2) {
  let xOverlap =
    Math.abs(rect1.x - rect2.x) <= Math.max(rect1.width, rect2.width);
  let yOverlap =
    Math.abs(rect1.y - rect2.y) <= Math.max(rect1.height, rect2.height);
  return xOverlap && yOverlap;
};

/*
 * Draw game objects on canvas
 */
const draw = function () {
  // clear screen on each render
  ctx.clearRect(0, 0, screenWidth, screenHeight);
  ctx.drawImage(sprites.background, 0, 0);
  ctx.drawImage(sprites.player, player.x, player.y);
  ctx.drawImage(sprites.goal, goal.x, goal.y);
  // draw enemies
  enemies.forEach(function (element) {
    ctx.drawImage(sprites.enemy, element.x, element.y);
  });
};

/*
 * Game state manager
 */
const update = function () {
  // move player if speed set on keyDown
  player.moveHorizontally();
  if (checkCollisions(player, goal)) {
    endGame('You Win');
  }
  // move enemies
  enemies.forEach(function (element) {
    if (checkCollisions(player, element)) {
      endGame('Try again 🙃');
    }
    element.moveVertically();
  });
  enemies[0].moveVertically();
};

/**
 * End Game logic
 */
const endGame = function (text) {
  isGameLive = false;
  console.log(text);
  window.location = '';
};

/**
 * Game Loop
 */
const step = function () {
  draw();
  update();
  if (isGameLive) {
    window.requestAnimationFrame(step);
  }
};

loadSprites();
step(); // start game-loop
