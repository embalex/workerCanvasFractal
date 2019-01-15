import { getColor, getIteration } from './mandelbrot.utils';


self.addEventListener('message', ({ data }) => {
  const {
    height, width, offsetRe, offsetIm, range, offsetX, windowX, threadNumber,
  } = data;
  if (typeof threadNumber === 'number') { console.time(`WorkerTimer_${threadNumber}`); }
  const MAX_ITERATION = 10000;
  const retArray = [];
  for (let col = offsetX; col < (offsetX + windowX); col += 1) {
    for (let row = 0; row < height; row += 1) {
      const cRe = offsetRe + (col - width / 2) * (4 / width) * range;
      const cIm = offsetIm + (row - height / 2) * (4 / height) * range;

      const pointColor = getColor(
        getIteration({ cRe, cIm, maxN: MAX_ITERATION }),
        MAX_ITERATION,
      );

      retArray.push({ x: col, y: row, color: pointColor });
    }
  }
  if (typeof threadNumber === 'number') { console.timeEnd(`WorkerTimer_${threadNumber}`); }
  postMessage(retArray);
});
