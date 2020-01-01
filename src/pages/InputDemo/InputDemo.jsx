import React, { Component } from 'react';
import * as yup from 'yup';
import style from './style';
import {
  Button,
  TextField,
  RadioGroup,
  SelectField,
} from '../../components';

import {
  SPORTSOPTIONS,
  CRICKETOPTIONS,
  FOOTBALLOPTIONS,
  CRICKET,
  FOOTBALL,
} from '../../configs/constants';

const Schema = yup.object({
  value: yup.string().min(3).required().label('Name'),
  Sport: yup.string().required().label('Sport'),
  Football: yup.string().label('What you do?').when('Sport', {
    is: res => res === 'Football',
    then: yup.string().required(),
  }),
  Cricket: yup.string().label('What you do?').when('Sport', {
    is: res => res === 'Cricket',
    then: yup.string().required(),
  }),
});

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      touched: {},
      value: '',
      Sport: '',
      Cricket: '',
      Football: '',
    };
  }

  handleBlur = index => () => {
    const { touched } = this.state;
    touched[index] = true;
    this.setState({
      touched,
    }, () => this.handleValidate());
  }

  handleValidate = () => {
    const {
      value,
      Sport,
      Football,
      Cricket,
    } = this.state;
    Schema.validate({
      value,
      Sport,
      Football,
      Cricket,
    }, { abortEarly: false })
      .then(() => {
        this.handleErrors(null);
      })
      .catch((errors) => {
        this.handleErrors(errors);
      });
  }

  hasErrors = () => {
    const { errors } = this.state;
    return Object.keys(errors).length !== 0;
  }

  isTouched = () => {
    const { touched } = this.state;
    return Object.keys(touched).length !== 0;
  }

  handleErrors = (errors) => {
    const catchErrors = {};
    if (errors) {
      errors.inner.forEach((error) => {
        catchErrors[error.path] = error.message;
      });
    }

    this.setState({
      errors: catchErrors,
    });
  }

  handleNameChange = (event) => {
    this.setState({
      value: event.target.value,
    }, () => this.handleValidate());
  }

  handleSportsChange = (event) => {
    this.setState({
      Sport: event.nativeEvent.target.value,
      Cricket: '',
      Football: '',
    }, () => this.handleValidate());
  }

  handlePositionChange = (event) => {
    const { Sport } = this.state;
    this.setState({
      Cricket: (Sport === CRICKET) ? event.nativeEvent.target.value : '',
      Football: (Sport === FOOTBALL) ? event.nativeEvent.target.value : '',
    }, () => this.handleValidate());
  }

  getError = (field) => {
    const { errors, touched } = this.state;
    if (!touched[field]) {
      return null;
    }
    const err = '';
    return errors[field] || err;
  }

  renderCricket = () => {
    const { Sport, Cricket } = this.state;
    if (Sport !== CRICKET) {
      return null;
    }
    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup
          value={Cricket}
          onBlur={this.handleBlur('Cricket')}
          options={CRICKETOPTIONS}
          onChange={this.handlePositionChange}
          error={this.getError('Cricket')}
        />
      </div>
    );
  }

  renderFootball = () => {
    const { Sport, Football } = this.state;
    if (Sport !== FOOTBALL) {
      return null;
    }
    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup
          value={Football}
          onBlur={this.handleBlur('Football')}
          options={FOOTBALLOPTIONS}
          onChange={this.handlePositionChange}
          error={this.getError('Football')}
        />
      </div>
    );
  }

  render() {
    const { value, Sport } = this.state;
    console.log(this.state);
    return (
      <>
        <h3>Name</h3>
        <TextField
          value={value}
          onBlur={this.handleBlur('value')}
          onChange={this.handleNameChange}
          error={this.getError('value')}
        />
        <h3>Select the game you play?</h3>
        <SelectField
          value={Sport}
          onChange={this.handleSportsChange}
          options={SPORTSOPTIONS}
          onBlur={this.handleBlur('Sport')}
          error={this.getError('Sport')}
        />
        {this.renderCricket()}
        {this.renderFootball()}

        <div style={style.base}>
          <Button value="Cancel" onClick={() => {}} />
          <Button
            style={style.margin}
            onClick={() => {}}
            value="Submit"
            color="primary"
            disabled={this.hasErrors() || !this.isTouched()}
          />
        </div>
      </>
    );
  }
}

export default InputDemo;
