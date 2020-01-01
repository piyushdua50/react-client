import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style';
import { DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils/math';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { random, duration, banners } = this.props;
    const total = banners.length;
    this.interval = setInterval(() => {
      const { index } = this.state;
      if (random) {
        this.setState({
          index: getRandomNumber(total),
        });
        return;
      }
      const nextIndex = getNextRoundRobin(index, total);
      this.setState({
        index: nextIndex,
      });
    }, duration);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  render() {
    const {
      altText,
      banners,
      random,
      defaultBanner,
      height,
      ...rest
    } = this.props;
    const { index } = this.state;
    const source = (banners) ? banners[index] : defaultBanner;
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <img src={source} {...rest} alt={altText} height={height} style={style.img} />
        </div>
      </>
    );
  }
}

const propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arr,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

const defaultProps = {
  altText: 'Default Banner',
  banners: '',
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 3000,
  height: 200,
  random: false,
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
