import { Component } from 'react';
import PropTypes from 'prop-types';

class Math extends Component {
  getResult = () => {
    const { first, second, operator } = this.props;
    switch (operator) {
    case '+':
      return (first + second);
    case '-':
      return (first - second);
    case '*':
      return (first * second);
    case '/':
      return (second === 0) ? 'Infinity' : (first / second);
    default:
      return 'Invalid Operation';
    }
  }

  render() {
    const {
      first,
      second,
      children,
      operator,
    } = this.props;
    return children
      ? children({
        first,
        second,
        operator,
        result: this.getResult(),
      })
      : `${first} ${operator} ${second} = ${this.getResult()}`;
  }
}

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

Math.defaultProps = {
  children: null,
};

export default Math;
