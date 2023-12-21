import { ctx } from "./index.js";
import { CANVAS_HEIGH, CANVAS_WIDTH } from "./index.js";

class Background {
  constructor(
    imageURL,
    width,
    height,
    position,
    speed,
    widthCanvas,
    heightCanvas
  ) {
    this.image = image;
    this.imageURL = imageURL;
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
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGH);
    ctx.drawImage(
      this.image,
      this.positionXCanvas,
      this.positionYCanvas,
      this.widthCanvas,
      this.heightCanvas,
      this.position.x,
      this.position.y,
      this.widthCanvas,
      this.heightCanvas
    );
  }
  update() {
    this.positionXCanvas, this.positionYCanvas;
  }
}
