import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    error,
    onChange,
    value,
    options,
    defaultText,
    ...rest
  } = props;
  const errors = (error) ? style.error : {};
  return (
    <>
      <select
        {...rest}
        value={value}
        style={{ ...style.base, ...errors, color: style.base.color }}
        onChange={onChange}
      >
        <option value="">{defaultText}</option>
        {options.map(option => (
          <option value={option.value}>{option.value}</option>
        ))}
      </select>
      {error ? <p style={{ ...errors }}>{error}</p> : ''}
    </>
  );
};

SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
};

SelectField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf),
  defaultText: PropTypes.string,
};

export default SelectField;
