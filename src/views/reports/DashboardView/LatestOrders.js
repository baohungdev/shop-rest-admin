import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { name, actions } from 'src/views/carts/redux';
import mapping from 'src/views/carts/utils/mapStatusCodeToText';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({
  className,
  actions,
  isFetchingCartList,
  cartList,
  ...rest
}) => {
  const classes = useStyles();

  React.useEffect(() => {
    actions.fetchCarts({
      fetchParam: {
        page: 0,
        perpage: 10
      },
      status: 0,
      from: moment()
        .startOf('week')
        .toDate(),
      to: moment()
        .endOf('week')
        .toDate()
    });
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Đơn hàng trong tuần" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Ngày
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartList.map(cart => (
                <TableRow hover key={cart.id}>
                  <TableCell>{cart.id}</TableCell>
                  <TableCell>{cart.customer.fullName}</TableCell>
                  <TableCell>
                    {moment(cart.updatedAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={mapping(cart.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Link to="/app/carts/">
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            Xem tất cả
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestOrders);
