import MandelbrotWorker from './workers/mandelbrot.worker';
import CalculateBlocker from './CalculateBlocker';

import { parameters } from './constants';


class FractalMultiThread {
  constructor({
    height, width, onReady, threads,
  }) {
    this.fractalPosition = {
      offsetRe: 0,
      offsetIm: 0,
      offsetX: 0,
      windowX: width,
      range: 1,
      height,
      width,
    };

    this.threads = threads;
    this.onReady = onReady;
    this.calculateBlocker = new CalculateBlocker();
  }

  setOffset = ({ offsetRe, offsetIm, range }) => {
    this.fractalPosition.offsetRe = offsetRe;
    this.fractalPosition.offsetIm = offsetIm;
    this.fractalPosition.range = range;
    this.recalculateFractal();
  };

  getWorker = ({ subWidth, widthStep, threadNumber }) => {
    const subFractalPosition = { ...this.fractalPosition };
    subFractalPosition.offsetX = subWidth;
    subFractalPosition.windowX = widthStep;
    return new Promise((resolve) => {
      const subFractal = new MandelbrotWorker();
      subFractal.addEventListener('message', subFractalResult => resolve(subFractalResult.data));
      subFractal.postMessage({ threadNumber, ...subFractalPosition });
    });
  };

  recalculateFractal = () => {
    this.calculateBlocker.startCalculate();
    const fractalPromiseArray = [];
    const widthStep = Math.floor(this.fractalPosition.width / this.threads);
    for (
      let threadNumber = 0, subWidth = 0;
      subWidth < this.fractalPosition.width;
      subWidth += widthStep
    ) {
      fractalPromiseArray.push(this.getWorker({ subWidth, widthStep, threadNumber }));
      threadNumber += 1;
    }

    Promise.all(fractalPromiseArray)
      .then((resultArray) => {
        const retValue = [].concat(...resultArray);
        this.calculateBlocker.stopCalculate();
        this.onReady({ data: retValue });
      });
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

export default FractalMultiThread;
