export const Fractal = jest.fn().mockImplementation(
  () => ({
    moveUp: () => {},
    moveDown: () => {},
    moveLeft: () => {},
    moveRight: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
    recalculateFractal: () => {},
  }),
);
