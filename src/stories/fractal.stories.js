import React from 'react';

import { storiesOf } from '@storybook/react';

import { fractalType } from '../lib';
import FractalView from '../components/FractalView';


storiesOf('Fractals ', module)
  .add('Mandelbrot set', () => <FractalView type={fractalType.mandelbrot} />);
