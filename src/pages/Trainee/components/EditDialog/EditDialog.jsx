import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import Person from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import callApi from '../../../../libs/utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  field: {
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

class EditDialog extends Component {
  constructor(props) {
    super(props);
    console.log('++++++++', props);
    this.state = {
      name: '',
      email: '',
      disabled: true,
      loading: false,
    };
  }

  handleSubmit = () => {
    const { name, email } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ name, email });
  }

  handleOnChange = (newName, newEmail) => {
    this.setState({
      disabled: false,
      name: newName,
      email: newEmail,
    });
  }

  handleApi = async (openSnackbar) => {
    this.setState({
      loading: true,
      disabled: true,
    })
    const { name, email } = this.state;
    const { data } = this.props;
    const id = data.originalId;
    const records = { name, email, id };
    const token = await callApi('put', '/trainee', records);
    if (token.data) {
      this.setState({
        loading: false,
        disabled: false,
      }, () => { this.handleSubmit(name, email); openSnackbar(token.data.message, 'success'); })
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
      edit,
      Name,
      Email,
      ...other
    } = this.props;
    const { disabled, loading } = this.state;
    return (
      <>
        <Dialog
          open={edit}
          {...other}
          fullWidth
          maxWidth="md"
          onClose={onClose}
        >
          <DialogTitle>Edit Trainee</DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <TextField
                  label="Name"
                  className={classes.field}
                  defaultValue={Name}
                  onChange={event => this.handleOnChange(event.target.value, Email)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="outlined-error"
                  label="Email"
                  className={classes.textField}
                  defaultValue={Email}
                  onChange={event => this.handleOnChange(Name, event.target.value)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => onClose()} color="default">
              Cancel
            </Button>
            <SnackBarConsumer>
              {({ openSnackbar }) => (
                <Button
                  variant="contained"
                  disabled={disabled}
                  onClick={() => this.handleApi(openSnackbar)}
                  color="primary"
                  autoFocus
                >
                {loading && <CircularProgress size={24} className={classes.spinner} />}
                  Submit
                </Button>
              )}
            </SnackBarConsumer>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const propTypes = {
  edit: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  Name: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  data: PropTypes.objectOf.isRequired,
  classes: PropTypes.objectOf.isRequired,
};

const defaultProps = {
  edit: false,
  onSubmit: () => { },
};

EditDialog.propTypes = propTypes;
EditDialog.defaultProps = defaultProps;
export default withStyles(styles)(EditDialog);
