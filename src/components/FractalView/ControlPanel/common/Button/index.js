import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper } from './Button.styled';


const propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

const defaultProps = {
  text: '',
};

const Button = ({
  onClick,
  text,
}) => (
  <ButtonWrapper onClick={onClick}>
    <div>{text}</div>
  </ButtonWrapper>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
