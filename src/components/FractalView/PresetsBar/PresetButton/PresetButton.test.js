import React from 'react';
import { shallow } from 'enzyme';

import PresetButton from './index';


describe('PresetButton', () => {
  it('rendered without problem', () => {
    shallow(<PresetButton caption="test" onClick={jest.fn()} />);
  });
});
