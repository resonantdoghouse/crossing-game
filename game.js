const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let screenWidth = 1000;
let screenHeight = 500;
let width = 50;
let isGameLive = true;

class GameCharacter {
  constructor(x, y, width, height, color, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.maxSpeed = 4;
  }

  moveHorizontally() {
    this.x += this.speed;
  }

  moveVertically() {
    if (this.y > screenHeight - 100 || this.y < 50) {
      this.speed = -this.speed;
    }
    this.y += this.speed;
  }
}

const enemies = [
  new GameCharacter(200, 225, width, width, "rgb(0, 0, 255)", 2),
  new GameCharacter(450, screenHeight - 100, width, width, "rgb(0, 0, 255)", 3),
  new GameCharacter(700, 50, width, width, "rgb(0, 0, 255)", 4)
];

const player = new GameCharacter(50, 225, width, width, "rgb(0, 255, 0)", 0);

const goal = new GameCharacter(
  screenWidth - width,
  200,
  width,
  100,
  "rgb(0,0,0)",
  0
);

document.onkeydown = function(event) {
  let keyPressed = event.keyCode;
  if (keyPressed == 39) {
    player.speed = player.maxSpeed;
  } else if (keyPressed == 37) {
    player.speed = -player.maxSpeed;
  }
};

document.onkeyup = function(event) {
  player.speed = 0;
};

const checkCollisions = function(rect1, rect2) {
  let xOverlap =
    Math.abs(rect1.x - rect2.x) <= Math.max(rect1.width, rect2.width);
  let yOverlap =
    Math.abs(rect1.y - rect2.y) <= Math.max(rect1.height, rect2.height);

  return xOverlap && yOverlap;
};

const draw = function() {
  ctx.clearRect(0, 0, screenWidth, screenHeight);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  enemies.forEach(function(element) {
    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
  });

  ctx.fillStyle = goal.color;
  ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
};

const update = function() {
  player.moveHorizontally();

  if (checkCollisions(player, goal)) {
    endGame("You Win");
  }

  enemies.forEach(function(element) {
    if (checkCollisions(player, element)) {
      endGame("You Dead :(");
    }

    element.moveVertically();
  });
  enemies[0].moveVertically();
};

const endGame = function(text) {
  isGameLive = false;
  alert(text);
  window.location = "";
};

const step = function() {
  draw();
  update();
  if(isGameLive){
    window.requestAnimationFrame(step);
  }
};

step();
