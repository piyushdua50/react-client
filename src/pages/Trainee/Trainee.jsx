import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import TraineeDetail from './TraineeDetail';
import TraineeList from './TraineeList';

const Trainee = ({ match }) => (
  <>
    <Switch>
      <Route exact path={match.url} component={TraineeList} />
      <Route path={`${match.url}/:id`} component={TraineeDetail} />
    </Switch>
  </>
);

Trainee.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string, path: PropTypes.string }).isRequired,
};

export default Trainee;
