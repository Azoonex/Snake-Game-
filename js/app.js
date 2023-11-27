const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;

let scale = 10;
let rows = canvas.height / scale; // 15
let columns = canvas.width / scale; // 30

function Food() {
  this.x;
  this.y;

  this.generateRandomLocation = function () {
    this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
  };

  this.foodDraw = function () {
    ctx.fillStyle = "#f00"; // red
    ctx.fillRect(this.x, this.y, scale, scale);
  };
}

function Snake() {
  this.x = 0;
  this.y = 20;
  this.xSpeed = scale;
  this.ySpeed = 0;

  this.total = 0;
  this.tail = []; // {x: 12, y: 12}, {x: ?, y: ?}

  this.snakeDraw = function () {
    ctx.fillStyle = "#fff";

    for (let i = 0 ; i < this.tail.length ; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.updateLocation = function () {

    for (let i = 0 ; i < this.tail.length - 1 ; i++) {
      this.tail[i] = this.tail[i + 1]
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y }

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) {
      this.x = 0;
    } else if (this.y > canvas.height) {
      this.y = 0;
    } else if (this.x < 0) {
      this.x = canvas.width;
    } else if (this.y < 0) {
      this.y = canvas.height;
    }
  };

  this.updateDirection = function (userDirection) {
    switch (userDirection) {
      case "Up": {
        this.xSpeed = 0;
        this.ySpeed = -scale;
        break;
      }
      case "Down": {
        this.xSpeed = 0;
        this.ySpeed = scale;
        break;
      }
      case "Left": {
        this.xSpeed = -scale;
        this.ySpeed = 0;
        break;
      }
      case "Right": {
        this.xSpeed = scale;
        this.ySpeed = 0;
        break;
      }
    }
  };

  this.isEatFood = function (food) {
    if (this.x === food.x && this.y === food.y) {
      this.total++;
      console.log(this.total);
      return true;
    }
    return false;
  };
}

window.addEventListener("load", () => {
  let snake = new Snake();
  let food = new Food();
  food.generateRandomLocation();

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food.foodDraw();
    snake.snakeDraw();
    snake.updateLocation();

    if (snake.isEatFood(food)) {
      console.log("عه غذا رو خورد");
      food.generateRandomLocation();
    }
  }, 200);

  window.addEventListener("keydown", (event) => {
    let userDirection = event.key.replace("Arrow", "");
    snake.updateDirection(userDirection);
  });
});
