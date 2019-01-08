import MandelbrotWorker from './workers/mandelbrot.worker';


class Fractal {
  constructor({ height, width, onReady }) {
    this.fractalPosition = {
      offsetX: 0,
      offsetY: 0,
      range: 1,
      height,
      width,
    };

    this.testSW = new MandelbrotWorker();
    this.testSW.addEventListener('message', onReady);
  }

  recalculateFractal = () => {
    this.testSW.postMessage(this.fractalPosition);
  };

  moveLeft = () => {
    const { offsetX, range } = this.fractalPosition;

    this.fractalPosition.offsetX = offsetX - range / 3;
    this.recalculateFractal();
  };

  moveRight = () => {
    const { offsetX, range } = this.fractalPosition;

    this.fractalPosition.offsetX = offsetX + range / 3;
    this.recalculateFractal();
  };

  moveUp = () => {
    const { offsetY, range } = this.fractalPosition;

    this.fractalPosition.offsetY = offsetY - range / 3;
    this.recalculateFractal();
  };

  moveDown = () => {
    const { offsetY, range } = this.fractalPosition;

    this.fractalPosition.offsetY = offsetY + range / 3;
    this.recalculateFractal();
  };

  zoomIn = () => {
    const { range } = this.fractalPosition;

    this.fractalPosition.range = range / 10;
    this.recalculateFractal();
  };

  zoomOut = () => {
    const { range } = this.fractalPosition;

    this.fractalPosition.range = range * 10;
    this.recalculateFractal();
  };
}

export default Fractal;
