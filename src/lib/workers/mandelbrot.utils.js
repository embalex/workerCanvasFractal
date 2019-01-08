export const getColor = (n, maxN) => {
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
};

export const getIteration = ({ cRe, cIm, maxN }) => {
  let x = 0;
  let y = 0;
  let iteration = 0;
  while (x * x + y * y <= 4 && iteration < maxN) {
    const xNew = x * x - y * y + cRe;
    y = 2 * x * y + cIm;
    x = xNew;
    iteration += 1;
  }
  return iteration;
};
