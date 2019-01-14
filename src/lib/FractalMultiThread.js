import MandelbrotWorker from './workers/mandelbrot.worker';

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
  }

  getWorker = ({ subWidth, widthStep, threadNumber }) => {
    const subFractalPosition = { ...this.fractalPosition };
    subFractalPosition.offsetX = subWidth;
    subFractalPosition.windowX = widthStep;
    return new Promise((resolve) => {
      const subFractal = new MandelbrotWorker();
      subFractal.addEventListener('message', subFractalResult => resolve(subFractalResult));
      subFractal.postMessage({ threadNumber, ...subFractalPosition });
    });
  };

  recalculateFractal = () => {
    console.group('New calculation profiling');
    console.time('multithreadTimer');
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
        console.time('Copy data to single array: ');
        const retValue = resultArray.reduce((acc, item) => ([...acc, ...item.data]), []);
        console.timeEnd('Copy data to single array: ');
        console.timeEnd('multithreadTimer');
        console.groupEnd();
        this.onReady({ data: retValue });
      });
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

export default FractalMultiThread;
