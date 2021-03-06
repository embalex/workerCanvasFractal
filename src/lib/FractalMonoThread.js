import MandelbrotWorker from './workers/mandelbrot.worker';
import CalculateBlocker from './CalculateBlocker';

import { parameters } from './constants';


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
      this.calculateBlocker.stopCalculate();
      onReady(value);
    });
    this.calculateBlocker = new CalculateBlocker();
  }

  setOffset = ({ offsetRe, offsetIm, range }) => {
    this.fractalPosition.offsetRe = offsetRe;
    this.fractalPosition.offsetIm = offsetIm;
    this.fractalPosition.range = range;
    this.recalculateFractal();
  };

  recalculateFractal = () => {
    this.calculateBlocker.startCalculate();
    this.testSW.postMessage(this.fractalPosition);
  };

  moveLeft = () => {
    const { offsetRe, range } = this.fractalPosition;
    if (this.calculateBlocker.isCalculating()) { return; }

    this.fractalPosition.offsetRe = offsetRe - range / parameters.moveRatio;
    this.recalculateFractal();
  };

  moveRight = () => {
    const { offsetRe, range } = this.fractalPosition;
    if (this.calculateBlocker.isCalculating()) { return; }

    this.fractalPosition.offsetRe = offsetRe + range / parameters.moveRatio;
    this.recalculateFractal();
  };

  moveUp = () => {
    const { offsetIm, range } = this.fractalPosition;
    if (this.calculateBlocker.isCalculating()) { return; }

    this.fractalPosition.offsetIm = offsetIm - range / parameters.moveRatio;
    this.recalculateFractal();
  };

  moveDown = () => {
    const { offsetIm, range } = this.fractalPosition;
    if (this.calculateBlocker.isCalculating()) { return; }

    this.fractalPosition.offsetIm = offsetIm + range / parameters.moveRatio;
    this.recalculateFractal();
  };

  zoomIn = () => {
    const { range } = this.fractalPosition;
    if (this.calculateBlocker.isCalculating()) { return; }

    this.fractalPosition.range = range / parameters.zoomRatio;
    this.recalculateFractal();
  };

  zoomOut = () => {
    const { range } = this.fractalPosition;
    if (this.calculateBlocker.isCalculating()) { return; }

    this.fractalPosition.range = range * parameters.zoomRatio;
    this.recalculateFractal();
  };
}

export default FractalMonoThread;
