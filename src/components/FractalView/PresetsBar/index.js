import React from 'react';
import PropTypes from 'prop-types';

import PresetButton from './PresetButton';

import { PresetsBarWrapper } from './PresetBar.styled';


const propTypes = {
  presets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setPreset: PropTypes.func.isRequired,
};

const PresetsBar = ({ presets, setPreset }) => {
  const presetButtons = presets.map(
    (item, i) => <PresetButton key={i} caption={`Preset ${i}`} onClick={() => setPreset(item)} />,
  );

  return (
    <PresetsBarWrapper>
      {presetButtons}
    </PresetsBarWrapper>
  );
};

PresetsBar.propTypes = propTypes;

export default PresetsBar;
