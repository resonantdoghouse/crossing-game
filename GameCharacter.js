/*
 * Game  Character
 */
class GameCharacter {
  constructor(x, y, width, height, color, speed, screenHeight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.maxSpeed = 4;
    this.screenHeight = screenHeight;
  }
  moveHorizontally() {
    this.x += this.speed;
  }
  moveVertically() {
    if (this.y > this.screenHeight - 100 || this.y < 50) {
      this.speed = -this.speed;
    }
    this.y += this.speed;
  }
}

export default GameCharacter;
