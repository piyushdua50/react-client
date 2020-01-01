import React from 'react';
import PropTypes from 'prop-types';
import styler from './style';

const Button = (props) => {
  const {
    onClick,
    value,
    disabled,
    color,
    style,
    ...data
  } = props;
  const newstyle = (color === 'default' || !styler[color] || disabled) ? {} : styler[color];
  return (
    <>
      <input
        type="button"
        {...data}
        style={{ ...styler.base, ...newstyle, ...style }}
        onClick={onClick}
        value={value}
        color={color}
        disabled={disabled}
      />
    </>
  );
};

Button.defaultProps = {
  error: '',
  color: 'default',
  disabled: false,
  style: {},
};

Button.propTypes = {
  error: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
};

export default Button;
