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
  makeStyles
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as warehouseItemActions
} from 'src/views/warehouses/WarehouseItemView/redux';
import _get from 'lodash/get';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, actions, warehouseItems, ...rest }) => {
  const classes = useStyles();

  const [selectedWarehouseItemIds, setSelectedWarehouseItemIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    actions.fetchWarehouseItems({
      fetchParam: {
        page,
        perpage: limit
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
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Tồn kho</TableCell>
                <TableCell>Giá vốn trung bình</TableCell>
                <TableCell>Nhập lần cuối</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouseItems.slice(0, limit).map(warehouseItem => (
                <TableRow
                  hover
                  key={warehouseItem.id}
                  selected={
                    selectedWarehouseItemIds.indexOf(warehouseItem.id) !== -1
                  }
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        selectedWarehouseItemIds.indexOf(warehouseItem.id) !==
                        -1
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
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={warehouseItems.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
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
