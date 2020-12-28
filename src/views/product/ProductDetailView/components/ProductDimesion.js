import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Grid,
  TextField,
  Divider
} from '@material-ui/core';

import { name, actions } from '../redux';

const ProductDimension = ({ actions, view: product }) => {
  const handleChangeDimension = e => {
    actions.changeDimension({ property: e.target.name, value: e.target.value });
  };

  return (
    <Card>
      <CardHeader title="Kích thước sản phẩm" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              name="width"
              value={product.width}
              variant="outlined"
              type="number"
              fullWidth
              label="Chiều Rộng (cm)"
              onChange={handleChangeDimension}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="length"
              value={product.length}
              variant="outlined"
              type="number"
              fullWidth
              onChange={handleChangeDimension}
              label="Chiều Dài (cm)"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="height"
              value={product.height}
              variant="outlined"
              type="number"
              fullWidth
              onChange={handleChangeDimension}
              label="Chiều Cao (cm)"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="weight"
              value={product.weight}
              variant="outlined"
              type="number"
              fullWidth
              onChange={handleChangeDimension}
              label="Khối lượng (g)"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Box mt={2} />
    </Card>
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDimension);
