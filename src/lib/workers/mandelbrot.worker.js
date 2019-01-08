import { getColor, getIteration } from './mandelbrot.utils';

self.addEventListener('message', ({ data }) => {
  console.group(' Worker start ');
  console.time('worker');

  const {
    height, width, offsetX, offsetY, range,
  } = data;
  const MAX_ITERATION = 4000;
  const retArray = [];
  for (let row = 0; row < height; row += 1) {
    for (let col = 0; col < width; col += 1) {
      const cRe = offsetX + (col - width / 2) * (4 / width) * range;
      const cIm = offsetY + (row - height / 2) * (4 / height) * range;

      const pointColor = getColor(
        getIteration({ cRe, cIm, maxN: MAX_ITERATION }),
        MAX_ITERATION,
      );

      retArray.push({ x: col, y: row, color: pointColor });
    }
  }
  postMessage(retArray);
  console.timeEnd('worker');
  console.groupEnd();
});
