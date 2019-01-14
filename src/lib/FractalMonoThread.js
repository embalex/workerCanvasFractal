import MandelbrotWorker from './workers/mandelbrot.worker';
import CalculateBlocker from './CalculateBlocker';


class FractalMonoThread {
  constructor({ height, width, onReady }) {
    this.fractalPosition = {
      offsetRe: 0,
      offsetIm: 0,
      offsetX: 0,
      windowX: width,
      range: 1,
      height,
      width,
    };

    this.testSW = new MandelbrotWorker();
    this.testSW.addEventListener('message', (value) => {
      const calculateTime = this.calculateBlocker.stopCalculate();
      console.log('Thread time -> ', calculateTime);
      onReady(value);
    });
    this.calculateBlocker = new CalculateBlocker();
  }

  recalculateFractal = () => {
    this.calculateBlocker.startCalculate();
    this.testSW.postMessage(this.fractalPosition);
  };

  moveLeft = () => {
    const { offsetRe, range } = this.fractalPosition;

    this.fractalPosition.offsetRe = offsetRe - range / 3;
    this.recalculateFractal();
  };

  moveRight = () => {
    const { offsetRe, range } = this.fractalPosition;

    this.fractalPosition.offsetRe = offsetRe + range / 3;
    this.recalculateFractal();
  };

  moveUp = () => {
    const { offsetIm, range } = this.fractalPosition;

    this.fractalPosition.offsetIm = offsetIm - range / 3;
    this.recalculateFractal();
  };

  moveDown = () => {
    const { offsetIm, range } = this.fractalPosition;

    this.fractalPosition.offsetIm = offsetIm + range / 3;
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

export default FractalMonoThread;
