import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import callApi from '../../../../libs/utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  spinner: {
    position: 'absolute',
  }
});
class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      loading: false,
    };
  }

  handleApi = async (openSnackbar) => {
    this.setState({
      disabled: true,
      loading: true,
    })
    const { data, onSubmit } = this.props;
    const id = data.originalId;
    const Date = '2019-02-14T18:15:11.778Z';
    const token = await callApi('delete', `/trainee/${id}`, { id });
    if (token.data) {
      this.setState({
        loading: false,
        disabled: false,
      }, () => {
        onSubmit(data);
        if (data.createdAt < Date) {
          openSnackbar('Trainee can not be Deleted', 'error');
        } else {
          openSnackbar(token.data.message, 'success');
        }
      })
    } else {
      this.setState({
        loading: false,
        disabled: false,
      }, () => { openSnackbar(token, 'error') })
    }
  }

  render() {
    const {
      classes,
      onClose,
      onSubmit,
      data,
      ...other
    } = this.props;

    const { disabled, loading } = this.state;

    return (
      <SnackBarConsumer>
        {({ openSnackbar }) => (
          <Dialog
            {...other}
            fullWidth
            maxWidth="md"
            onClose={onClose}
          >
            <DialogTitle>Remove Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to remove this trainee?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => onClose()} color="default">
                Cancel
            </Button>
              <Button
                variant="contained"
                disabled={disabled}
                onClick={() => this.handleApi(openSnackbar)}
                color="primary"
                autoFocus
              >
                {
                  loading && <CircularProgress size={24} className={classes.spinner} />
                }
                Delete
            </Button>
            </DialogActions>
          </Dialog>
        )}
      </SnackBarConsumer>
    );
  };
}

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf.isRequired,
};

const defaultProps = {
  open: false,
  onSubmit: () => { },
};

RemoveDialog.propTypes = propTypes;
RemoveDialog.defaultProps = defaultProps;
export default withStyles(styles)(RemoveDialog);
