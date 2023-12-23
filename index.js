export let CANVAS_WIDTH = window.innerWidth;
export let CANVAS_HEIGHT = window.innerHeight;

export let canvas = document.querySelector("canvas");

export let ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
import { mainBackground } from "./background.js";

export let frequency = 6;
let celerity = 20;
let lader = window.innerWidth >= 1000 ? 3 / 3 : 3 / 6;
let widthCharacter = 100;
let heightCharacter = 190;
let safeMargin = 3;

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
    this.timeInJump = 0;
    this.numberJump = 0;
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
      // this.speed.y = 0;
      this.y =
        this.y >= canvas.height - this.height
          ? ((this.speed.y = 0), canvas.height - this.height - 2)
          : 1;
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

// Fonction pour gérer les actions en fonction de la touche ou du toucher
function handleInput(action) {
  switch (action) {
    case "right":
      ninja.inMove = true;
      ninja.speed.x = celerity;
      ninja.reverse = false;
      break;
    case "left":
      ninja.inMove = true;
      ninja.speed.x = -celerity;
      ninja.reverse = true;
      break;
    case "up":
      if (ninja.y >= CANVAS_HEIGHT - safeMargin - heightCharacter * lader) {
        console.log(
          "reset jump number",
          ninja.y,
          CANVAS_HEIGHT - heightCharacter * lader
        );
        ninja.numberJump = 0;
      }
      ninja.timeInJump = Date.now();
      ninja.numberJump < 2 ? ninja.numberJump++ : handleInput("down");
      console.log(ninja.timeInJump, ninja.numberJump);
      if (ninja.numberJump < 2 && Date.now() - ninja.timeInJump < 600) {
        ninja.y < heightCharacter * lader
          ? undefined
          : ((ninja.inJump = true), (ninja.speed.y = -3 * lader * celerity));
      }
      break;
    case "down":
      ninja.y + heightCharacter * lader + safeMargin > CANVAS_HEIGHT
        ? undefined
        : (ninja.speed.y = 4.5 * lader * celerity);
      break;
    default:
    // Gérer d'autres actions
  }
}

// Gérer les événements de clavier
addEventListener("keydown", (event) => {
  event.preventDefault();
  backgroundAudio.play();
  console.log(event.key);
  switch (event.key) {
    case "ArrowRight":
      handleInput("right");
      break;
    case "ArrowLeft":
      handleInput("left");
      break;
    case "ArrowUp":
      handleInput("up");
      break;
    case "ArrowDown":
      handleInput("down");
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
      handleInput("down");
      break;
  }
});

// Gérer les événements tactiles
let touchStartX, touchEndX, touchStartY, touchEndY;

canvas.addEventListener("touchstart", (event) => {
  event.preventDefault();
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

canvas.addEventListener("touchmove", (event) => {
  event.preventDefault();
  touchEndX = event.touches[0].clientX;
  let deltaX = touchEndX - touchStartX;

  touchEndY = event.touches[0].clientY;
  let deltaY = touchEndY - touchStartY;

  if (deltaX > 10) {
    handleInput("right");
  } else if (deltaX < -10) {
    handleInput("left");
  }
  if (deltaY > 10) {
    handleInput("down");
  } else if (deltaY < -10) {
    handleInput("up");
  }
});

canvas.addEventListener("touchend", (event) => {
  event.preventDefault();
  backgroundAudio.play();
  ninja.speed.x = 0;
  ninja.speed.y = 0;
  ninja.inMove = false;
  handleInput("down");
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
    background[0].update(0);
    background[1].update(CANVAS_WIDTH);
    background[0].draw();
    background[1].draw();
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
