export default () => {
  addEventListener('message', ({ data }) => {
    console.group(' Worker start ');
    console.time('worker');
    function calcColor(n, maxN) {
      if (n === maxN) { return 'black'; }

      const COLOR_WIDTH = 666;
      const COLOR_OFFSET = 3200;

      let colorRatio = ((n + COLOR_OFFSET) % (3 * COLOR_WIDTH));
      switch (Math.floor(colorRatio / COLOR_WIDTH)) {
        case 0: // blue 116.11.0
          colorRatio = colorRatio / COLOR_WIDTH;
          return (
            `rgb(
              ${237 * colorRatio},
              ${11 + 244 * colorRatio},
              ${116 + 139 * colorRatio}`
          );

        case 1: // White 255.255.237
          colorRatio = (colorRatio - COLOR_WIDTH) / COLOR_WIDTH;
          return (
            `rgb(
              ${238},
              ${255 - 123 * colorRatio},
              ${255 - 253 * colorRatio}`
          );

        default:
          colorRatio = (colorRatio - 2 * COLOR_WIDTH) / COLOR_WIDTH;
          return (
            `rgb(
              ${239 - 239 * colorRatio},
              ${132 - 121 * colorRatio},
              ${2 + 114 * colorRatio}`
          );
      }
    }

    const {
      height, width, offsetX, offsetY, range,
    } = data;
    const MAX_ITERATION = 4000;
    const retArray = [];
    for (let row = 0; row < height; row += 1) {
      for (let col = 0; col < width; col += 1) {
        const cRe = offsetX + (col - width / 2) * (4 / width) * range;
        const cIm = offsetY + (row - height / 2) * (4 / height) * range;

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
          color: calcColor(iteration, MAX_ITERATION),
        });
      }
    }
    postMessage(retArray);
    console.timeEnd('worker');
    console.groupEnd();
  });
};
