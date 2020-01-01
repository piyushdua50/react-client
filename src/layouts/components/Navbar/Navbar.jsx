import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../../../theme';

const styles = {
  root: {
    paddingBottom: '20px',
    width: '100%',
  },
  grow: {
    flexGrow: 1,
    fontSize: '20px',
  },
  button: {
    fontSize: '12px',
    color: 'inherit',
  },
  logout: {
    color: 'inherit',
    fontSize: '12px',
    marginLeft: theme.spacing.unit * 3,
  },
};

function handleClearToken() {
  localStorage.removeItem('token');
}

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Trainee Portal
          </Typography>
          <Link to="/trainee" component={RouterLink} color="inherit" underline="none">
            <Button className={classes.button}>TRAINEE</Button>
          </Link>
          <Link to="/text-field-demo" component={RouterLink} color="inherit" underline="none">
            <Button className={classes.button}>TEXT FIELD DEMO</Button>
          </Link>
          <Link to="/input-demo" component={RouterLink} color="inherit" underline="none">
            <Button className={classes.button}>INPUT DEMO</Button>
          </Link>
          <Link to="/children-demo" component={RouterLink} color="inherit" underline="none">
            <Button className={classes.button}>CHILDREN DEMO</Button>
          </Link>
          <Link to="/login" component={RouterLink} color="inherit" underline="none">
            <Button onClick= {handleClearToken} className={classes.logout}>LOGOUT</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(NavBar);
