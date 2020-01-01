import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import theme from '../../theme';

const styles = {
  found: {
    marginTop: theme.spacing.unit * 6,
    fontSize: '50px',
  },
  notfound: {
    margin: theme.spacing.unit * 4,
    fontSize: '20px',
  },
};

function NoMatch(props) {
  const { classes } = props;
  return (
    <>
      <Typography component="h1" variant="h2" className={classes.found} align="center">
        Not Found
      </Typography>
      <Typography variant="h6" className={classes.notfound} align="center">
        Seems like the page you are looking after does not exist.
      </Typography>
    </>
  );
}
NoMatch.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(NoMatch);
