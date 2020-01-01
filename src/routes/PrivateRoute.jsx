import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';

const propTypes = {
  component: PropTypes.element.isRequired,
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      (localStorage.getItem('token'))
      ? (
        <PrivateLayout>
          <Component {...matchProps} />
        </PrivateLayout>
        )
      : <Redirect to="/login" />
    )}
  />
);

PrivateRoute.propTypes = propTypes;
export default PrivateRoute;
