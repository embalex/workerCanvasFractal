import React from 'react';

import { storiesOf } from '@storybook/react';

import { fractalType } from '../lib';
import FractalView from '../components/FractalView';


storiesOf('Mandelbrot set ', module)
  .add('using one worker', () => <FractalView type={fractalType.mandelbrot} />);

storiesOf('Mandelbrot set. Workers are being remade ', module)
  .add('using 2 workers', () => <FractalView type={fractalType.mandelbrot} threads={2} />)
  .add('using 4 workers', () => <FractalView type={fractalType.mandelbrot} threads={4} />)
  .add('using 10 workers', () => <FractalView type={fractalType.mandelbrot} threads={10} />)
  .add('using 20 workers', () => <FractalView type={fractalType.mandelbrot} threads={20} />);
