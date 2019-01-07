export default () => {
  addEventListener('message', ({ data }) => {
    function calcColor(n) {
      return `rgb(
      ${255 - ((n / 6) % 255)},
      ${255 - ((n / 8) % 255)},
      ${255 - ((n / 12) % 255)}
      )`;
    }

    const { height, width } = data;
    const MAX_ITERATION = 10000;
    const retArray = [];
    for (let row = 0; row < height; row += 1) {
      for (let col = 0; col < width; col += 1) {
        const cRe = (col - width / 2) * 4 / width;
        const cIm = (row - height / 2) * 4 / width;
        let x = 0;
        let y = 0;
        let iteration = 0;
        while (x * x + y * y <= 4 && iteration < MAX_ITERATION) {
          const xNew = x * x - y * y + cRe;
          y = 2 * x * y + cIm;
          x = xNew;
          iteration += 1;
        }

        retArray.push({
          method: 'fillRect',
          x: col,
          y: row,
          color: calcColor(MAX_ITERATION - iteration),
        });
      }
    }
    postMessage(retArray);
  });
};
