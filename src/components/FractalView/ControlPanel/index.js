import React from 'react';
import PropTypes from 'prop-types';

import PositionControl from './PositionControl';
import ZoomControl from './ZoomControl';
import { Wrapper } from './ControlPanel.styled';


const propTypes = {
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onLeft: PropTypes.func.isRequired,
  onRight: PropTypes.func.isRequired,
  onZoomIn: PropTypes.func.isRequired,
  onZoomOut: PropTypes.func.isRequired,
};

const ControlPanel = ({
  onUp,
  onLeft,
  onRight,
  onDown,
  onZoomIn,
  onZoomOut,
}) => (
  <Wrapper>
    <ZoomControl
      onZoomIn={onZoomIn}
      onZoomOut={onZoomOut}
    />
    <PositionControl
      onLeft={onLeft}
      onRight={onRight}
      onDown={onDown}
      onUp={onUp}
    />
  </Wrapper>
);

ControlPanel.propTypes = propTypes;
export default ControlPanel;
