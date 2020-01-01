import React from 'react';
import propTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, onChange, ...rest } = props;
  const errors = (error) ? style.error : {};
  return (
    <>
      <input type="text" {...rest} onChange={onChange} style={{ ...style.base, ...errors, color: style.base.color }} />
      {(error) ? <p style={{ ...errors }}>{error}</p> : ''}
    </>
  );
};

TextField.defaultProps = {
  error: '',
};

TextField.propTypes = {
  error: propTypes.string,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
};

export default TextField;
