import React from 'react';
import { shallow } from 'enzyme';

import FractalView from './index';
import { fractalType } from '../../lib';


describe('Fractal', () => {
  it('rendered without problem', () => {
    shallow(<FractalView type={fractalType.mandelbrot} />);
  });
});
