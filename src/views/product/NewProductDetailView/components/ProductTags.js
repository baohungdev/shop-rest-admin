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
import ChipInput from 'material-ui-chip-input';

import { name, actions } from '../redux';

const ProductTags = ({ actions, add: product }) => {
  const handleAddChip = chip => {
    actions.changeProductTags({ type: 'add', value: chip });
  };

  const handleDeleteChip = (chip, index) => {
    actions.changeProductTags({ type: 'remove', value: chip, index });
  };

  return (
    <Card>
      <CardHeader title="Thẻ" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ChipInput
              fullWidth
              label="Thẻ sản phẩm"
              variant="outlined"
              defaultValue={product.tags}
              onAdd={chip => handleAddChip(chip)}
              onDelete={(chip, index) => handleDeleteChip(chip, index)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductTags);
