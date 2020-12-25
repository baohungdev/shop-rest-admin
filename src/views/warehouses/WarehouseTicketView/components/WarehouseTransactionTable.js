import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Avatar,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableSortLabel,
  TableRow,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import mapStatusCodeToText from 'src/views/warehouses/WarehouseTicketView/utils/mapStatusCodeToText';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import _range from 'lodash/range';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { headCells } from '../data';
import {
  stableSort,
  descendingComparator,
  getComparator
} from 'src/utils/sortInTable';
import {
  name,
  actions as warehouseTicketActions
} from 'src/views/warehouses/WarehouseTicketView/redux';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

const WarehouseTransactionTable = ({
  className,
  actions,
  searchForName,
  selectedWarehouseTransactionType,
  warehouseTransactions,
  tableDisplay,
  ...rest
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');

  const handleLimitChange = event => {
    let page = tableDisplay.page;
    if (tableDisplay.count < event.target.value * tableDisplay.page) {
      page = 0;
    }

    actions.setLimit({
      name: searchForName,
      fetchParam: {
        page,
        perpage: event.target.value
      }
    });
  };

  const handlePageChange = (event, newPage) => {
    actions.setPage({
      name: searchForName,
      fetchParam: {
        page: newPage,
        perpage: tableDisplay.limit
      }
    });
  };

  useEffect(() => {
    actions.fetchWarehouseTransaction({
      ...(_isEmpty(searchForName) ? {} : { name: searchForName }),
      type: selectedWarehouseTransactionType,
      fetchParam: {
        page: tableDisplay.page,
        perpage: tableDisplay.limit
      }
    });
  }, []);

  const createSortHandler = property => event => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map(headCell => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>Chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rest.isFetchingWarehouseTransaction ? (
                <React.Fragment>
                  {_range(10).map(i => (
                    <TableRow>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ) : (
                stableSort(warehouseTransactions, getComparator(order, orderBy))
                  .slice(0, tableDisplay.limit)
                  .map(warehouseTransaction => (
                    <TableRow hover key={warehouseTransaction.id}>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Avatar
                            src={_get(warehouseTransaction, 'createdBy.avatar')}
                          />
                          <Typography color="textPrimary" variant="body1">
                            {_get(warehouseTransaction, 'createdBy.name')}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {_get(warehouseTransaction, 'manufacturer.name')}
                      </TableCell>
                      <TableCell>
                        {mapStatusCodeToText(
                          _get(warehouseTransaction, 'status')
                        )}
                      </TableCell>
                      <TableCell>
                        {moment(warehouseTransaction.createdAt).format('L')}
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary">
                          <OpenInNewIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={tableDisplay.count}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={tableDisplay.page}
        rowsPerPage={tableDisplay.limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Hiển thị"
      />
    </Card>
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...warehouseTicketActions };

  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarehouseTransactionTable);
