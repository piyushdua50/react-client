import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';

const propTypes = {
  children: PropTypes.element.isRequired,
};

const AuthLayout = ({ children }) => (
  <div>
    <div>
      {children}
    </div>
    <div>
      <Footer />
    </div>
  </div>
);

AuthLayout.propTypes = propTypes;
export default AuthLayout;
