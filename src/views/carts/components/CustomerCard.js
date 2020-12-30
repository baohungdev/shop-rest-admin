import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  Grid,
  Box,
  Container,
  Divider,
  CardHeader,
  CartActions,
  CardContent,
  TextField
} from '@material-ui/core';
import { name, actions as cartActions } from 'src/views/carts/redux';

const CustomerCart = ({ action, singleCart }) => {
  return (
    <Card>
      <CardHeader title="Thông tin khách hàng" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Họ tên"
              value={singleCart.customer.fullName || ''}
              fullWidth
              disabled={true}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số điện thoại"
              value={
                singleCart.customer.addresses[singleCart.customerAddressIndex]
                  .phone || ''
              }
              fullWidth
              disabled={true}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={singleCart.customer.email || ''}
              fullWidth
              disabled={true}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Địa chỉ"
              value={
                singleCart.customer.addresses[singleCart.customerAddressIndex]
                  .street || ''
              }
              fullWidth
              disabled={true}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Tỉnh thành"
              value={
                singleCart.customer.addresses[singleCart.customerAddressIndex]
                  .city || ''
              }
              fullWidth
              disabled={true}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Quận huyện"
              value={
                singleCart.customer.addresses[singleCart.customerAddressIndex]
                  .district || ''
              }
              fullWidth
              disabled={true}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Phường xã"
              value={
                singleCart.customer.addresses[singleCart.customerAddressIndex]
                  .ward || ''
              }
              fullWidth
              disabled={true}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ghi chú"
              value={singleCart.note || ''}
              fullWidth
              disabled={true}
              variant="outlined"
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCart);
