import React from 'react';
import { shallow } from 'enzyme';

import ZoomControl from './index';


describe('ZoomControl', () => {
  it('rendered without problem', () => {
    shallow(
      <ZoomControl
        onZoomIn={jest.fn()}
        onZoomOut={jest.fn()}
      />,
      { disableLifecycleMethods: true },
    );
  });
});
