// let canvas = document.querySelector("canvas");
// console.log("🚀 ~ file: index.js:2 ~ canvas:", canvas);
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// let ctx = canvas.getContext("2d");

// class Player {
//   constructor(
//     name,
//     width,
//     height,
//     x,
//     y,
//     spriteWidth,
//     spriteHeight,
//     speed,
//     frame,
//     url
//   ) {
//     this.name = name;
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.spriteWidth = spriteWidth;
//     this.spriteHeight = spriteHeight;
//     this.image = new Image();
//     this.image.src = url;
//     this.speed = speed;
//     this.frame = frame;
//     this.maxFrame = 9;
//     this.spriteX =
//       this.frame < 5 ? spriteWidth * this.frame : spriteWidth * this.frame - 5;
//     this.spriteY = this.frame < 5 ? spriteHeight * 1 : spriteHeight * 2;
//   }
//   update(speed) {
//     console.log("update pending");
//     if (this.frame < this.maxFrame) {
//       this.frame++;
//     } else {
//       this.frame = 0;
//     }
//     this.x += speed;
//     this.y += speed;
//     window.requestAnimationFrame(() => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       this.update(speed);
//       this.draw();
//       console.log(this.frame);
//     });
//   }

//   draw() {
//     ctx.drawImage(
//       this.image,
//       this.spriteX,
//       this.spriteY,
//       this.spriteWidth,
//       this.spriteHeight,
//       this.x,
//       this.y,
//       this.width,
//       this.height
//     );
//   }
// }

// let ninja = new Player(
//   "ninja",
//   280,
//   385,
//   0,
//   0,
//   280,
//   385,
//   0,
//   0,
//   "./assets/character1.png"
// );

// ninja.image.onload = () => {
//   ninja.update(0);
// };

let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let frequency = 5;

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      this.image,
      this.spriteX,
      this.spriteY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
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
  140,
  190,
  50,
  300,
  280,
  385,
  0,
  0, // Speed
  0,
  "./assets/character1.png"
);

ninja.image.onload = () => {
  ninja.animate();
  ninja.time = Date.now();
};

addEventListener("keydown", (event) => {
  event.preventDefault();
  console.log(event.key);
  switch (event.key) {
    case "ArrowRight":
      ninja.speed.x = 20;
      break;
    case "ArrowLeft":
      ninja.speed.x = -20;
      break;
    case "ArrowUp":
      ninja.speed.y = -20;
      break;
    case "ArrowDown":
      ninja.speed.y = 20;
      break;
  }
});
