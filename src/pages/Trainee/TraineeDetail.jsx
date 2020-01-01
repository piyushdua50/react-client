import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import { Button, CssBaseline } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import trainees from './data/trainee';
import { NoMatch } from '../NoMatch';

const styles = theme => ({
  outer: {
    width: 'auto',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  card: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 2,
  },
  details: {
    flex: 1,
    marginLeft: theme.spacing.unit,
  },
  image: {
    width: 190,
    fontSize: 30,
  },
  email: {
    fontSize: 20,
    marginTop: 4,
  },
  date: {
    fontSize: 22,
  },
  button: {
    marginTop: theme.spacing.unit * 4,
    fontSize: 20,
  },
});

class TraineeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTraineeDetails = (id) => {
    let traineeDetail;
    trainees.forEach((details) => {
      if (id === details.id) {
        traineeDetail = details;
      }
    });
    return traineeDetail;
  }

  getDate = (date) => {
    moment.defaultFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
    return (moment(moment.utc(date).toDate().toString()).format(moment.defaultFormat));
  }

  render() {
    const { classes, match } = this.props;
    const { id } = match.params;
    const user = this.getTraineeDetails(id);
    if (!user) {
      return <NoMatch />;
    }
    return (
      <>
        <div className={classes.outer}>
          <CssBaseline />
          <Card className={classes.card}>
            <Hidden>
              <CardMedia
                image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                className={classes.image}
              />
            </Hidden>
            <div className={classes.details}>
              <CardContent>
                <Typography component="h1" variant="h6">
                  {user.name}
                </Typography>
                <Typography className={classes.date} color="textSecondary">
                  {this.getDate(user.createdAt)}
                </Typography>
                <Typography className={classes.email}>
                  {user.email}
                </Typography>
              </CardContent>
            </div>
          </Card>
          <div align="center">
            <Button variant="contained" color="inherit" className={classes.button}>
              <Link color="inherit" component={RouterLink} to="/trainee" underline="none">Back</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
}

const propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.shape({ url: PropTypes.string, path: PropTypes.string }).isRequired,
};

TraineeDetail.propTypes = propTypes;
export default withStyles(styles)(TraineeDetail);
