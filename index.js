export let CANVAS_WIDTH = window.innerWidth;
export let CANVAS_HEIGHT = window.innerHeight;

export let canvas = document.querySelector("canvas");

export let ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
import { mainBackground } from "./background.js";

export let frequency = 6;
let celerity = 20;
let lader = 3 / 3;
let widthCharacter = 100;
let heightCharacter = 190;

class Player {
  constructor(
    name,
    width,
    height,
    x,
    y,
    spriteWidth,
    spriteHeight,
    speedX,
    speedY,
    frame,
    url
  ) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.image = new Image();
    this.image.src = url;
    this.speed = { x: 0, y: 0 };
    this.frame = frame;
    this.maxFrame = 9;
    this.spriteX = 0;
    this.spriteY = 0;
    this.time = 0;
    this.reverse = false;
    this.inJump = false;
    this.inMove = false;
  }

  update() {
    if (this.frame < this.maxFrame) {
      this.frame++;
    } else {
      this.frame = 0;
    }
    this.spriteX =
      this.frame < 5
        ? this.spriteWidth * this.frame
        : this.spriteWidth * (this.frame - 5);
    this.spriteY = this.frame < 5 ? 35 : 385;
    if (this.x < canvas.width - this.width && this.x > 0) {
      this.x += this.speed.x;
    } else {
      this.speed.x = 0;
      this.x =
        this.x >= canvas.width - this.width ? canvas.width - this.width - 4 : 4;
    }
    if (this.y < canvas.height - this.height && this.y > 0) {
      this.y += this.speed.y;
    } else {
      this.speed.y = 0;
      this.y =
        this.y >= canvas.height - this.height
          ? canvas.height - this.height - 4
          : 4;
    }
  }

  draw() {
    this.y >= CANVAS_HEIGHT - heightCharacter * lader - 4
      ? (this.inJump = false)
      : (this.inJump = true);

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this.reverse == false) {
      ctx.drawImage(
        this.image,
        this.inMove ? this.spriteX : 280,
        this.inMove ? this.spriteY : 0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.reverse == true) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(
        this.image,
        this.inMove ? this.spriteX : 280,
        this.inMove ? this.spriteY : 0,
        this.spriteWidth,
        this.spriteHeight,
        -this.x - this.width,
        this.y,
        this.width,
        this.height
      );
      ctx.restore();
    }
  }

  animate() {
    if ((Date.now() - this.time) / 10 < frequency) {
      requestAnimationFrame(() => {
        this.animate();
      });
    } else {
      this.update();
      this.draw();
      this.time = Date.now();
      requestAnimationFrame(() => {
        this.animate();
      });
    }
  }
}

let ninja = new Player(
  "ninja",
  widthCharacter * lader,
  heightCharacter * lader,
  50,
  CANVAS_HEIGHT,
  280,
  385,
  0,
  0, // Speed
  0,
  "./assets/character1.png"
);

addEventListener("keydown", (event) => {
  event.preventDefault();
  backgroundAudio.play();
  console.log(event.key);
  switch (event.key) {
    case "ArrowRight":
      ninja.inMove = true;
      ninja.speed.x = celerity;
      ninja.reverse = false;
      break;
    case "ArrowLeft":
      ninja.inMove = true;
      ninja.speed.x = -celerity;
      ninja.reverse = true;
      break;
    case "ArrowUp":
      ninja.inJump = true;
      ninja.speed.y = -3 * celerity;

      // ninja.setTimeoutDown = setTimeout(() => {
      //   ninja.speed.y = 3 * celerity;
      // }, 1000);
      break;
    case "ArrowDown":
      ninja.speed.y = 4.5 * celerity;
      // ninja.setTimeoutUp = setTimeout(() => {
      //   ninja.speed.y = 3 * celerity;
      // }, 1000);
      break;
  }
});
addEventListener("keyup", (event) => {
  event.preventDefault();
  console.log(event.key);
  switch (event.key) {
    case "ArrowRight":
      ninja.inMove = false;
      ninja.speed.x = 0;
      ninja.reverse = false;
      break;
    case "ArrowLeft":
      ninja.inMove = false;
      ninja.speed.x = 0;
      ninja.reverse = true;
      break;
    case "ArrowUp":
      ninja.speed.y = 3 * celerity;
      break;
  }
});

//##################

// ninja.image.onload = () => {
//   ninja.animate();
//   ninja.time = Date.now();
// };

let background = await mainBackground();

// background.image.onload = () => {
//   background.animate();
// };

function animateAll() {
  if ((Date.now() - ninja.time) / 10 < frequency) {
    requestAnimationFrame(() => {
      animateAll();
    });
  } else {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    background.draw();
    ninja.update();
    ninja.draw();
    ninja.time = Date.now();
    requestAnimationFrame(() => {
      animateAll();
    });
  }
}

animateAll();

const backgroundAudio = document.getElementById("backgroundAudio");

// document.addEventListener("click", () => {
//   backgroundAudio.play();
// });
