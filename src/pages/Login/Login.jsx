import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import PasswordIcon from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SnackBarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';
import {
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import callApi from '../../libs/utils/api';

const Schema = yup.object({
  email: yup.string().email().required().label('Email Address'),
  password: yup.string()
    .required('Password is required'),
});

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: (theme.spacing.unit) * 4,
  },
  submit: {
    marginTop: theme.spacing.unit * 6,
  },
  spinner: {
    position: 'absolute',
  }
});

class Login extends Component {
  state = {
    errors: {},
    touched: {},
    email: '',
    password: '',
    loading: false,
  };

  handleChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, this.handleValidate);
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
      email,
      password,
    } = this.state;
    Schema.validate({
      email,
      password,
    }, { abortEarly: false })
      .then(() => {
        this.handleErrors(null);
      })
      .catch((errors) => {
        this.handleErrors(errors);
      });
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

  getError = (field) => {
    const { errors, touched } = this.state;
    if (!touched[field]) {
      return null;
    }
    const err = '';
    return errors[field] || err;
  }

  hasErrors = () => {
    const { errors } = this.state;
    return Object.keys(errors).length !== 0;
  }

  isTouched = () => {
    const { touched } = this.state;
    return Object.keys(touched).length !== 0;
  }

  handleApi = async (openSnackbar) => {
    this.setState({
      loading: true,
    })
    const { email, password } = this.state;
    const data = { email, password };
    const token = await callApi('post', '/user/login', data);
    if (token.data) {
      const { history } = this.props;
      localStorage.setItem('token', token.data.data);
      return (history.push('/trainee'));
    }
    else {
      this.setState({
        loading: false,
      }, () => {openSnackbar(token, 'error')});
    }
  }

  render() {
    const {
      classes,
    } = this.props;

    const {
      email,
      password,
      loading,
    } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6" padding="40px">
            Login
          </Typography>
          <TextField
            fullWidth
            className={classes.form}
            variant="outlined"
            label="Email Address"
            type="text"
            value={email}
            onChange={this.handleChange('email')}
            onBlur={this.handleBlur('email')}
            error={this.getError('email')}
            helperText={this.getError('email')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={classes.form}
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            fullWidth
            onChange={this.handleChange('password')}
            onBlur={this.handleBlur('password')}
            error={this.getError('password')}
            helperText={this.getError('password')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
          />
          <SnackBarConsumer>
            {({ openSnackbar }) => (
              <Button
                className={classes.submit}
                fullWidth
                color="primary"
                onClick={() => this.handleApi(openSnackbar)}
                variant="contained"
                disabled={this.hasErrors() || !this.isTouched() || loading}
              >
                {loading && <CircularProgress size={24} className={classes.spinner} />}
                SIGN IN
          </Button>
            )}
          </SnackBarConsumer>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Login);
