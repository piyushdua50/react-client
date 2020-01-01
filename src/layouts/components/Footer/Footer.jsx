import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import theme from '../../../theme';

const styles = {
  foot: {
    margin: theme.spacing.unit * 4,
    fontSize: '15px',
  },
};

function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.foot} align="center">
      &copy; Successive Technologies
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Footer);
