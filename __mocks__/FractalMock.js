import { fractalType as libFractalType } from '../src/lib';

export const FractalMonoThread = jest.fn().mockImplementation(
  () => ({
    moveUp: () => {},
    moveDown: () => {},
    moveLeft: () => {},
    moveRight: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
    recalculateFractal: () => {},
    setOffset: () => {},
  }),
);

export const FractalMultiThread = jest.fn().mockImplementation(
  () => ({
    moveUp: () => {},
    moveDown: () => {},
    moveLeft: () => {},
    moveRight: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
    recalculateFractal: () => {},
    setOffset: () => {},
  }),
);

export const fractalType = { ...libFractalType };
