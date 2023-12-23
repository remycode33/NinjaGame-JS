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
  update(initialX) {
    if (this.position.x <= initialX - this.width) {
      console.log("this.position.x < -this.width");
      this.position.x = initialX;
    } else {
      this.position.x -= this.speed;
    }
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
  let canvas_width, canvas_height;
  let dim1 = new Promise((resolve) => {
    resolve(CANVAS_WIDTH);
  });
  let dim2 = new Promise((resolve) => {
    resolve(CANVAS_HEIGHT);
  });
  canvas_width = await dim1;
  canvas_height = await dim2;
  // await dim1.then((width) => (canvas_width = width));
  // await dim2.then((height) => (canvas_height = height));

  console.log(dim1, dim2);

  let background = new Background(
    "./assets/background1.png",
    canvas_width,
    canvas_height,
    { x: 0, y: 0 },
    2,
    1024,
    400
  );
  let background2 = async () => {
    await dim1, dim2;
    return new Background(
      "./assets/background1.png",
      canvas_width,
      canvas_height,
      { x: canvas_width, y: 0 },
      2,
      1024,
      400
    );
  };
  let bckg2 = await background2();

  return [background, bckg2];
};
