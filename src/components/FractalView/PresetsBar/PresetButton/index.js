import React from 'react';
import PropTypes from 'prop-types';

import { PresetButtonWrapper } from './PresetButton.styled';


const propTypes = {
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const PresetButton = ({ caption, onClick }) => (
  <PresetButtonWrapper onClick={onClick}>
    {caption}
  </PresetButtonWrapper>
);

PresetButton.propTypes = propTypes;

export default PresetButton;
