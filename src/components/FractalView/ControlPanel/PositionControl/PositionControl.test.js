import React from 'react';
import { shallow } from 'enzyme';

import PositionControl from './index';


describe('PositionControl', () => {
  it('rendered without problem', () => {
    shallow(
      <PositionControl
        onUp={jest.fn()}
        onDown={jest.fn()}
        onLeft={jest.fn()}
        onRight={jest.fn()}
      />
    );
  });
});
