import React from 'react';
import { shallow } from 'enzyme';

import FractalView from './index';


describe('Fractal', () => {
  it('rendered without problem', () => {
    shallow(<FractalView />);
  });
});
