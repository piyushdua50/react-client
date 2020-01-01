import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import * as moment from "moment";
import { AddDialog, EditDialog, RemoveDialog } from "./components";
import { TableData } from "../../components";
import callApi from "../../libs/utils/api";

const styles = theme => ({
  button: {
    fontSize: "15px",
    padding: "12px",
    margin: theme.spacing.unit * 3
  },
  circular: {
    marginTop: theme.spacing.unit * 25,
    marginLeft: theme.spacing.unit * 80
  }
});

class TraineeList extends Component {
  state = {
    open: false,
    edit: false,
    remove: false,
    order: "asc",
    orderBy: "",
    rowsPerPage: 10,
    page: 0,
    data: "",
    limit: 10,
    skip: 0,
    traineeRecords: "",
    name: "",
    email: "",
    loading: true
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleTrainee = record => {
    console.log("Details are - ", record);
    this.setState({
      open: false
    }, () => this.handleReload());
  };

  getFormattedDate = date => {
    moment.defaultFormat = "dddd, MMMM Do YYYY, h:mm:ss a";
    return moment(
      moment
        .utc(date)
        .toDate()
        .toString()
    ).format(moment.defaultFormat);
  };

  handleSelect = (event, id) => {
    const { history } = this.props;
    return history.push(`/trainee/${id}`);
  };

  handleSort = (event, property) => {
    this.createSortHandler(event, property);
  };

  createSortHandler = (event, property) => {
    const newOrderBy = property;
    let newOrder = "desc";
    const { order, orderBy } = this.state;
    if (orderBy === property && order === "desc") {
      newOrder = "asc";
    }
    this.setState({ order: newOrder, orderBy: newOrderBy });
  };

  handleChangePage = (event, page) => {
    const newSkip = 10 * page;
    const newLimit = 10;
    this.setState({
      page,
      skip: newSkip,
      limit: newLimit,
      loading: true,
    });
    callApi("get", `/trainee?limit=${newLimit}&skip=${newSkip}`).then(
      details => {
        if (details.status) {
          this.setState({
            traineeRecords: details.data.data.records,
            loading: false,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      }
    );
  };

  handleEditDialogOpen = (event, record) => {
    event.stopPropagation();
    const { name, email } = record;
    this.setState({ name, email, edit: true, data: record });
  };

  handleEditClose = () => {
    this.setState({ edit: false });
  };

  handleEditSubmit = data => {
    console.log("Edited Item ", data);
    this.setState({
      edit: false
    }, () => this.handleReload());
  };

  handleReload = async () => {
    this.setState({
      loading: true,
    });
    const { skip, limit } = this.state;
    const updatedRecord = await callApi('get', `/trainee?limit=${limit}&skip=${skip}`);
    const { page } = this.state;
    if (updatedRecord.data) {
      this.setState({
        loading: false,
        page: (updatedRecord.data.data.count > 0) ? page : page-1,
        traineeRecords: updatedRecord.data.data.records,
      })
    } else {
      this.setState({
        loading: false,
      });
  }
}

  handleRemoveDialogOpen = (event, record) => {
    event.stopPropagation();
    this.setState({ data: record, remove: true });
  };

  handleRemoveClose = () => {
    this.setState({ remove: false });
  };

  handleRemoveSubmit = data => {
    console.log("Deleted Item ", data);
    this.setState({
      remove: false
    }, () => this.handleReload());
  };

  componentDidMount() {
    const { skip, limit } = this.state;
    this.setState({
      loading: true,
    });
    callApi("get", `/trainee?limit=${limit}&skip=${skip}`).then(details => {
      if (details.status) {
        this.setState({
          traineeRecords: details.data.data.records,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const {
      open,
      edit,
      remove,
      order,
      data,
      orderBy,
      rowsPerPage,
      page,
      name,
      email,
      loading,
      traineeRecords
    } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div align="right">
          <Button
            className={classes.button}
            variant="outlined"
            onClick={this.handleClickOpen}
            color="primary"
            size="small"
          >
            ADD TRAINEE LIST
          </Button>
          <AddDialog
            open={open}
            onSubmit={this.handleTrainee}
            onClose={this.handleClose}
          />
        </div>
        <TableData
          data={traineeRecords}
          column={[
            {
              field: "name",
              label: "Name",
              align: "center"
            },
            {
              field: "email",
              label: "Email Address",
              format: value => value && value.toUpperCase()
            },
            {
              field: "createdAt",
              label: "Date",
              align: "center",
              format: this.getFormattedDate
            }
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          dataLength={traineeRecords.length}
          loading={loading}
          rowsPerPage={rowsPerPage}
          page={page}
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen
            }
          ]}
          onChangePage={this.handleChangePage}
        />
        <EditDialog
          open={edit}
          data={data}
          onSubmit={this.handleEditSubmit}
          onClose={this.handleEditClose}
          Name={name}
          Email={email}
        />
        <RemoveDialog
          open={remove}
          data={data}
          onSubmit={this.handleRemoveSubmit}
          onClose={this.handleRemoveClose}
        />
      </>
    );
  }
}

TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.shape({ url: PropTypes.string, path: PropTypes.string }).isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(TraineeList);
