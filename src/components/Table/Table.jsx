import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withLoaderAndMessage } from '../HOC';

const CustomTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.inherit,
    fontSize: 12,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 600,
    textSize: 12,
  },
  top: {
    fontWeight: 'bold',
  },
  strip: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  footer: {
    fontSize: 10,
  },
  button: {
    color: theme.palette.background.primary,
    marginRight: theme.spacing.unit * 4,
  },
});
class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      classes,
      column,
      data,
      onSelect,
      orderBy,
      order,
      onSort,
      count,
      page,
      rowsPerPage,
      onChangePage,
      actions,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead className={classes.top}>
            <TableRow>
              {
                column.map(cols => (
                  <CustomTableCell key={cols.field} align={cols.align} className={classes.head}>
                    <TableSortLabel
                      active={orderBy === cols.field}
                      direction={order}
                      onClick={event => onSort(event, cols.field)}
                    >
                      {cols.label}
                    </TableSortLabel>
                  </CustomTableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((trainee) => (
              <TableRow
                className={classes.strip}
                key={trainee.id}
                hover
                onClick={event => onSelect(event, trainee.id)}
              >
                {
                  column.map(cols => (
                    cols.format
                      ? (
                        <CustomTableCell align={cols.align}>
                          {cols.format(trainee[cols.field])}
                        </CustomTableCell>
                      )
                      : <CustomTableCell align={cols.align}>{trainee[cols.field]}</CustomTableCell>
                  ))
                }
                {
                  actions.map(action => (
                    <Button
                      className={classes.button}
                      onClick={event => action.handler(event, trainee)}
                    >
                      {action.icon}
                    </Button>
                  ))
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={count}
          rowsPerPageOptions={[]}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
        />
      </Paper>
    );
  }
}

TableData.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  column: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  count: PropTypes.number.isRequired,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  actions: PropTypes.objectOf(PropTypes.string),
};

TableData.defaultProps = {
  order: 'asc',
  orderBy: '',
  page: 0,
  rowsPerPage: 10,
  actions: null,
};

export default withStyles(styles)(withLoaderAndMessage(TableData));
