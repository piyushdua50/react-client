import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts';

const propTypes = {
  component: PropTypes.element.isRequired,
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);

AuthRoute.propTypes = propTypes;
export default AuthRoute;
