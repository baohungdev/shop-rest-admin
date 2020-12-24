import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  TableSortLabel,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  descendingComparator,
  getComparator,
  stableSort
} from 'src/utils/sortInTable';
import { headCells } from '../data';
import _get from 'lodash/get';
import _range from 'lodash/range';

import {
  name,
  actions as manufacturerActions
} from 'src/views/manufacturer/ManufacturerListView/redux';

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

const Results = ({
  className,
  actions,
  manufacturers,
  tableDisplay,
  searchForName,
  ...rest
}) => {
  const classes = useStyles();
  const [selectedManufacturerIds, setSelectedManufacturerIds] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('updatedAt');

  const handleSelectAll = event => {
    let newSelectedManufacturerIds;

    if (event.target.checked) {
      newSelectedManufacturerIds = manufacturers.map(m => m.id);
    } else {
      newSelectedManufacturerIds = [];
    }

    setSelectedManufacturerIds(newSelectedManufacturerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedManufacturerIds.indexOf(id);
    let newSelectedManufacturerIds = [];

    if (selectedIndex === -1) {
      newSelectedManufacturerIds = newSelectedManufacturerIds.concat(
        selectedManufacturerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedManufacturerIds = newSelectedManufacturerIds.concat(
        selectedManufacturerIds.slice(1)
      );
    } else if (selectedIndex === selectedManufacturerIds.length - 1) {
      newSelectedManufacturerIds = newSelectedManufacturerIds.concat(
        selectedManufacturerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedManufacturerIds = newSelectedManufacturerIds.concat(
        selectedManufacturerIds.slice(0, selectedIndex),
        selectedManufacturerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedManufacturerIds(newSelectedManufacturerIds);
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

  useEffect(() => {
    actions.fetchManufacturer({
      name: searchForName,
      fetchParam: {
        page: tableDisplay.page,
        perpage: tableDisplay.limit
      }
    });
  }, []);

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
                      selectedManufacturerIds.length === manufacturers.length
                    }
                    color="primary"
                    indeterminate={
                      selectedManufacturerIds.length > 0 &&
                      selectedManufacturerIds.length < manufacturers.length
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
              {rest.isFetchingManufacturer ? (
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
                      <TableCell>
                        <Skeleton animation="wave" />
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ) : (
                stableSort(manufacturers, getComparator(order, orderBy))
                  .slice(0, tableDisplay.limit)
                  .map(manufacturer => (
                    <TableRow
                      hover
                      key={manufacturer.id}
                      selected={
                        selectedManufacturerIds.indexOf(manufacturer.id) !== -1
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedManufacturerIds.indexOf(manufacturer.id) !==
                            -1
                          }
                          onChange={event =>
                            handleSelectOne(event, manufacturer.id)
                          }
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {manufacturer.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{manufacturer.email}</TableCell>
                      <TableCell>
                        {`${manufacturer.address}, ${manufacturer.ward}, ${manufacturer.district}, ${manufacturer.province}`}
                      </TableCell>
                      <TableCell>{manufacturer.phone}</TableCell>
                      <TableCell>{manufacturer.representative}</TableCell>
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

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...manufacturerActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
