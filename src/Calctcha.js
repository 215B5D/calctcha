/**
 * @author false <false@envs.net>
 */

// Dependencies
import Canvas from "canvas";

// Register Fonts
Canvas.registerFont("./assets/font.ttf", {
  family: "font" // TELEINDICADORES 1
});

// Calctcha Class
class Calctcha {
  /**
   * @param {String} hex - Hex colour for the captcha
   * @param {Number} min - Minimum number for the equation
   * @param {Number} max - Maximum number for the equation
   * @param {Number} width - Width of the canvas
   * @param {Number} height - Height of the canvas
   */
  constructor(hex, min, max, width, height) {
    this.hex = hex;

    this.min = min;
    this.max = max;

    this.width = width;
    this.height = height;

    this.canvas = null;
    this.context = null;

    this.operations = ["+", "÷", "×", "-"];
    this.equation = null;
    this.answer = null;
  }

  /**
   * - Get a pseudorandom number in a specific range
   *
   * @param {String} min - The minimum number
   * @param {String} max - The maximum number
   * @returns {Number} - The pseudorandom number
   */
  rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  /**
   * - Automatically generates the equation (ex: 1 + 2)
   */
  generateProblem = () => {
    const operation = this.operations[Math.floor(Math.random() * this.operations.length)];

    const left = this.rand(this.min, this.max);
    const right = this.rand(this.min, this.max);

    this.equation = `${left} ${operation} ${right}`;
    this.answer = Math.round(eval(this.equation.replace(/÷/, "/").replace(/×/, "*")));
  }

  /**
   * Automatically draws the equation onto the canvas & returns the data URL
   *
   * @returns {String} - The data URL of the canvas
   */
  draw = () => {
    let offsetX = 0, offsetY = (this.height / 2);

    for (const key of this.equation.replace(/ /g, "").split("")) {
      this.context.fillText(key, offsetX, offsetY);

      (this.rand(0, 1) === 0 ? offsetY += this.rand(5, 15) : offsetY -= this.rand(5, 10));
      offsetX += this.rand(60, 75);

      if (offsetX > this.width)
        offsetX -= (this.width / 3);

      if(offsetY > this.height)
        offsetY -= (this.height / 3);
    }

    return this.canvas.toDataURL();
  }

  /**
   * Creates the canvas & returns the data URL
   *
   * @returns {String} - The data URL for the canvas
   */
  create = () => {
    this.generateProblem();

    this.canvas = Canvas.createCanvas(this.width, this.height);
    this.context = this.canvas.getContext("2d");

    this.context.fillStyle = this.hex;
    this.context.font = "100px font";

    return this.draw();
  }
}

export default Calctcha;