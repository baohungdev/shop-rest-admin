import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as warehouseTicketActions
} from 'src/views/warehouses/WarehouseTicketView/redux';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

const ProductList = ({
  actions,
  newWarehouseTransaction,
  view,
  warehouseTransaction
}) => {
  const info = view ? warehouseTransaction : newWarehouseTransaction;
  return (
    <Table>
      <TableHead>
        <TableCell>STT</TableCell>
        <TableCell>Tên sản phẩm</TableCell>
        <TableCell>Số lượng</TableCell>
        <TableCell>Đơn giá</TableCell>
        <TableCell>Thành tiền</TableCell>
      </TableHead>
      <TableBody>
        {_isEmpty(_get(info, 'warehouseTransactionItems', [])) ? (
          <TableRow>
            <TableCell colSpan={5}>
              <Box textAlign="center">
                <img src="/static/images/empty-box-64.png" />
              </Box>
              <Box fontWeight="600" textAlign="center">
                Bạn chưa có sản phẩm
              </Box>
            </TableCell>
          </TableRow>
        ) : (
          <React.Fragment>
            {_map(
              _get(info, 'warehouseTransactionItems', []),
              (item, index) => {
                return (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <TextField
                        value={item.quantity}
                        type="number"
                        disabled={view}
                        onChange={e =>
                          actions.changeItemQuantity({
                            quantity: e.target.value,
                            id: item.id
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={item.cost}
                        type="number"
                        disabled={view}
                        onChange={e =>
                          actions.changeItemCost({
                            cost: e.target.value,
                            id: item.id
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>{item.cost * item.quantity}</TableCell>
                  </TableRow>
                );
              }
            )}
          </React.Fragment>
        )}
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Box fontWeight="fontWeightBold">Tổng cộng</Box>
          </TableCell>
          <TableCell>
            {_reduce(
              _get(info, 'warehouseTransactionItems', []),
              (carry, current) => {
                carry += current.cost * current.quantity;
                return carry;
              },
              0
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...warehouseTicketActions };

  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
