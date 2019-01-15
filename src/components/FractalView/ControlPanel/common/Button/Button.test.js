import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';


describe('Button', () => {
  it('rendered without problem', () => {
    shallow(
      <Button
        onClick={jest.fn()}
        text="test"
      />
    );
  });
});
