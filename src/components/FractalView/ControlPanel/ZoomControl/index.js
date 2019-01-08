import React from 'react';
import PropTypes from 'prop-types';

import Button from '../common/Button';
import { Wrapper } from './ZoomControl.styled';


const propTypes = {
  onZoomIn: PropTypes.func.isRequired,
  onZoomOut: PropTypes.func.isRequired,
};

const ZoomControl = ({
  onZoomIn,
  onZoomOut,
}) => (
  <Wrapper>
    <Button onClick={onZoomIn} text="+" />
    <Button onClick={onZoomOut} text="-" />
  </Wrapper>
);

ZoomControl.propTypes = propTypes;
export default ZoomControl;
