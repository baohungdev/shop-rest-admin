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

const CustomerCart = ({ action, customerInfo, cart }) => {
  return (
    <Card>
      <CardHeader title="Thông tin khách hàng" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Họ tên"
              value={customerInfo.fullName || ''}
              fullWidth
              disabled={true}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số điện thoại"
              value={customerInfo.addresses[cart.customerAddressIndex].phone || ''}
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
