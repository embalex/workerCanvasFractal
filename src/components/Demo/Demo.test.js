import React from 'react';
import { shallow } from 'enzyme';

import Demo from './index';


describe('Demo', () => {
  it('rendered without problem', () => {
    shallow(<Demo />);
  });
});
