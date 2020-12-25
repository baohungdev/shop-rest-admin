import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as warehouseTicketActions
} from 'src/views/warehouses/WarehouseTicketView/redux';
import _map from 'lodash/map';
import _get from 'lodash/get';

const ProductList = ({ actions, newWarehouseTransaction }) => {
  return (
    <Table>
      <TableHead>
        <TableCell>STT</TableCell>
        <TableCell>Tên sản phẩm</TableCell>
        <TableCell>Số lượng</TableCell>
        <TableCell>Xóa</TableCell>
      </TableHead>
      <TableBody>
        {_map(
          _get(newWarehouseTransaction, 'warehouseTransactionItems', []),
          (item, index) => {
            return (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <TextField
                    value={item.quantity}
                    type="number"
                    onChange={e =>
                      actions.changeItemQuantity({
                        quantity: e.target.value,
                        id: item.id
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => actions.deleteItem({ id: item.id })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          }
        )}
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
