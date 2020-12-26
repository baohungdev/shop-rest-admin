import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import SelectManufacturer from './SelectManufacturer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as warehouseTicketActions
} from 'src/views/warehouses/WarehouseTicketView/redux';

const ManufacturerCard = ({
  actions,
  newWarehouseTransaction,
  view,
  warehouseTransaction
}) => {
  const info = view ? warehouseTransaction : newWarehouseTransaction;

  return (
    <Card>
      <CardHeader title="Nhà cung cấp" />
      <Divider />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <SelectManufacturer view={view} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ghi chú"
              variant="outlined"
              fullWidth
              value={info.description}
              disabled={view}
              onChange={e => actions.changeDescription(e.target.value)}
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
  const actions = { ...warehouseTicketActions };

  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerCard);
