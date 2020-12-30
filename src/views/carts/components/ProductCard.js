import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import {
  Card,
  Grid,
  Box,
  Container,
  TableContainer,
  Paper,
  Divider,
  CardHeader,
  CartActions,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Chip,
  TableBody
} from '@material-ui/core';
import { name, actions as cartActions } from 'src/views/carts/redux';

const ProductCart = ({ action, singleCart }) => {
  return (
    <Card>
      <CardHeader title="Thông tin đơn hàng" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Đơn giá</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Giá bán</TableCell>
                </TableHead>
                <TableBody>
                  {_map(singleCart.basketItems, (item, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Avatar src={item.avatar} />
                          <Typography
                            color="textPrimary"
                            variant="body1"
                            style={{ marginLeft: '10px' }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(item.price)}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Box fontWeight={600}>Tổng cộng</Box>
                    </TableCell>
                    <TableCell>
                      {_reduce(
                        singleCart.basketItems,
                        (carry, item) => {
                          carry += item.price * item.quantity;
                          return carry;
                        },
                        0
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCart);
