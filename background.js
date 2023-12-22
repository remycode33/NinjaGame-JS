import { ctx } from "./index.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, frequency } from "./index.js";

export class Background {
  constructor(
    imageURL,
    width,
    height,
    position,
    speed,
    widthCanvas,
    heightCanvas
  ) {
    this.image = new Image();
    this.image.src = imageURL;
    this.width = width;
    this.height = height;
    this.position = position;
    this.speed = speed;
    this.widthCanvas = widthCanvas;
    this.heightCanvas = heightCanvas;
    this.positionXCanvas = 0;
    this.positionYCanvas = 0;
  }
  draw() {
    // ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.drawImage(
      this.image,
      this.positionXCanvas,
      this.positionYCanvas,
      this.widthCanvas,
      this.heightCanvas,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    (this.positionXCanvas = 0), (this.positionYCanvas = 0);
  }

  animate() {
    if ((Date.now() - this.time) / 10 < frequency) {
      requestAnimationFrame(() => {
        this.animate();
      });
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.update();
      this.draw();
      this.time = Date.now();
      requestAnimationFrame(() => {
        this.animate();
      });
    }
  }
}

export let mainBackground = async () => {
  let dim1 = new Promise((resolve) => {
    resolve(CANVAS_WIDTH);
  });
  let dim2 = new Promise((resolve) => {
    resolve(CANVAS_HEIGHT);
  });
  await dim1;
  await dim2;
  console.log(dim1, dim2);
  let background = new Background(
    "./assets/background1.png",
    await dim1,
    await dim2,
    { x: 0, y: 0 },
    0,
    1024,
    400
  );
  return background;
};
