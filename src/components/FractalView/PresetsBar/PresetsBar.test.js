import React from 'react';
import { shallow } from 'enzyme';

import PresetsBar from './index';


describe('PresetsBar', () => {
  it('rendered without problem', () => {
    const presetsMock = [
      { offsetRe: 1, offsetIm: 2, range: 3 },
      { offsetRe: 1, offsetIm: 2, range: 3 },
      { offsetRe: 1, offsetIm: 2, range: 3 },
    ];
    shallow(<PresetsBar presets={presetsMock} setPreset={jest.fn()} />);
  });
});
