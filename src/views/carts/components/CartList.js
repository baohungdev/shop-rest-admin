import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import * as colors from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/vi';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

import mapStatusCodeToText from '../utils/mapStatusCodeToText';
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
import { name, actions as cartActions } from 'src/views/carts/redux';

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
  },
  status0: {
    backgroundColor: `#e74c3c`,
    color: colors.common.white
  },
  status1: {
    backgroundColor: '#3498db',
    color: colors.common.white
  },
  status2: {
    backgroundColor: '#27ae60',
    color: colors.common.white
  },
  status3: {
    backgroundColor: '#34495e',
    color: colors.common.white
  },
  status4: {
    backgroundColor: '#f39c12',
    color: colors.common.white
  },
  status5: {
    backgroundColor: '#9b59b6',
    color: colors.common.white
  },
  status6: {
    backgroundColor: '#2ecc71',
    color: colors.common.white
  },
  status7: {
    backgroundColor: '#2ecc71',
    color: colors.common.white
  },
  status8: {
    backgroundColor: '#27ae60',
    color: colors.common.white
  },
  status9: {
    backgroundColor: '#95a5a6',
    color: colors.common.white
  },
  status10: {
    backgroundColor: '#2c3e50',
    color: colors.common.white
  }
}));

const CartList = ({ className, actions, cartList, tableDisplay, ...rest }) => {
  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');

  const handleLimitChange = event => {
    let page = tableDisplay.page;
    if (tableDisplay.count < event.target.value * tableDisplay.page) {
      page = 0;
    }

    actions.setLimit({
      fetchParam: {
        page,
        perpage: event.target.value
      }
    });
  };

  const handlePageChange = (event, newPage) => {
    actions.setPage({
      fetchParam: {
        page: newPage,
        perpage: tableDisplay.limit
      }
    });
  };

  useEffect(() => {
    actions.fetchCarts({
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
              {rest.isFetchingCartList ? (
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
                stableSort(cartList, getComparator(order, orderBy))
                  .slice(0, tableDisplay.limit)
                  .map(cart => (
                    <TableRow hover key={cart.id}>
                      <TableCell>
                        {moment(_get(cart, 'updatedAt'))
                          .locale('vi')
                          .format('LL')}
                      </TableCell>
                      <TableCell>
                        <Box fontWeight="600">
                          {_get(cart, 'customer.fullName')}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(_get(cart, 'totalPrice'))}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          className={classes[`status${_get(cart, 'status')}`]}
                          label={mapStatusCodeToText(_get(cart, 'status'))}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            history.push(`/app/carts/view?id=${cart.id}`)
                          }
                        >
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
  const actions = { ...cartActions };

  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
