import React from 'react';
import { shallow } from 'enzyme';

import ControlPanel from './index';


describe('ControlPanel', () => {
  it('rendered without problem', () => {
    shallow(
      <ControlPanel
        onUp={jest.fn()}
        onDown={jest.fn()}
        onLeft={jest.fn()}
        onRight={jest.fn()}
        onZoomIn={jest.fn()}
        onZoomOut={jest.fn()}
      />,
      { disableLifecycleMethods: true },
    );
  });
});
