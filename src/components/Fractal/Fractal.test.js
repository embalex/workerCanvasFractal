import React from 'react';
import { shallow } from 'enzyme';

import Fractal from './index';


describe('Fractal', () => {
  it('rendered without problem', () => {
    shallow(<Fractal />, { disableLifecycleMethods: true });
  });
});
