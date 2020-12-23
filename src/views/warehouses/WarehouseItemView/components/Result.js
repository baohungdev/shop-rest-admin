import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TableSortLabel,
  makeStyles
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as warehouseItemActions
} from 'src/views/warehouses/WarehouseItemView/redux';
import _get from 'lodash/get';
import _range from 'lodash/range';
import { headCells } from 'src/views/warehouses/WarehouseItemView/data';

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

function descendingComparator(a, b, orderBy) {
  if (_get(b, orderBy) < _get(a, orderBy)) {
    return -1;
  }
  if (_get(b, orderBy) > _get(a, orderBy)) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const Results = ({
  className,
  actions,
  warehouseItems,
  tableDisplay,
  searchForName,
  ...rest
}) => {
  const classes = useStyles();

  const [selectedWarehouseItemIds, setSelectedWarehouseItemIds] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('updatedAt');

  useEffect(() => {
    actions.fetchWarehouseItems({
      name: searchForName,
      fetchParam: {
        page: tableDisplay.page,
        perpage: tableDisplay.limit
      }
    });
  }, []);

  const handleSelectAll = event => {
    let newSelectedWarehouseItemIds;

    if (event.target.checked) {
      newSelectedWarehouseItemIds = warehouseItems.map(
        warehouseItem => warehouseItem.id
      );
    } else {
      newSelectedWarehouseItemIds = [];
    }

    setSelectedWarehouseItemIds(newSelectedWarehouseItemIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedWarehouseItemIds.indexOf(id);
    let newSelectedWarehouseItemIds = [];

    if (selectedIndex === -1) {
      newSelectedWarehouseItemIds = newSelectedWarehouseItemIds.concat(
        selectedWarehouseItemIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedWarehouseItemIds = newSelectedWarehouseItemIds.concat(
        selectedWarehouseItemIds.slice(1)
      );
    } else if (selectedIndex === selectedWarehouseItemIds.length - 1) {
      newSelectedWarehouseItemIds = newSelectedWarehouseItemIds.concat(
        selectedWarehouseItemIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedWarehouseItemIds = newSelectedWarehouseItemIds.concat(
        selectedWarehouseItemIds.slice(0, selectedIndex),
        selectedWarehouseItemIds.slice(selectedIndex + 1)
      );
    }

    setSelectedWarehouseItemIds(newSelectedWarehouseItemIds);
  };

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
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      selectedWarehouseItemIds.length === warehouseItems.length
                    }
                    color="primary"
                    indeterminate={
                      selectedWarehouseItemIds.length > 0 &&
                      selectedWarehouseItemIds.length < warehouseItems.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {rest.isFetchingWarehouseItems ? (
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
                stableSort(warehouseItems, getComparator(order, orderBy))
                  .slice(0, tableDisplay.limit)
                  .map(warehouseItem => (
                    <TableRow
                      hover
                      key={warehouseItem.id}
                      selected={
                        selectedWarehouseItemIds.indexOf(warehouseItem.id) !==
                        -1
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedWarehouseItemIds.indexOf(
                              warehouseItem.id
                            ) !== -1
                          }
                          onChange={event =>
                            handleSelectOne(event, warehouseItem.id)
                          }
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Avatar
                            className={classes.avatar}
                            src={_get(warehouseItem, 'product.imageUrls.0')}
                          >
                            {_get(warehouseItem, 'product.name')}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {_get(warehouseItem, 'product.name')}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{warehouseItem.quantity}</TableCell>
                      <TableCell>{warehouseItem.averageCost}</TableCell>
                      <TableCell>{moment().format('DD/MM/YYYY')}</TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={warehouseItems.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={tableDisplay.page}
        rowsPerPage={tableDisplay.limit}
        count={tableDisplay.count}
        labelRowsPerPage="Hiển thị"
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...warehouseItemActions };

  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
