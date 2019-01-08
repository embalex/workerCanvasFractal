import React from 'react';
import PropTypes from 'prop-types';

import Button from '../common/Button';
import { Wrapper, LineWrapper } from './PositionControl.styled';


const propTypes = {
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
  onLeft: PropTypes.func.isRequired,
  onRight: PropTypes.func.isRequired,
};

const PositionControl = ({
  onUp,
  onLeft,
  onRight,
  onDown,
}) => (
  <Wrapper>

    <LineWrapper>
      <Button onClick={onUp} text="▲" />
    </LineWrapper>

    <LineWrapper>
      <Button onClick={onLeft} text="◄" />
      <Button onClick={onRight} text="►" />
    </LineWrapper>

    <LineWrapper>
      <Button onClick={onDown} text="▼" />
    </LineWrapper>
  </Wrapper>
);

PositionControl.propTypes = propTypes;
export default PositionControl;
