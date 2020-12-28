import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Grid,
  Input,
  CardActions,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
  IconButton,
  TextField,
  Divider
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import _isEmpty from 'lodash/isEmpty';
import { name, actions } from '../redux';

const ProductFeatures = ({ actions, view: product }) => {
  const [defaultFeature, setDefaulFeature] = React.useState('');
  const handleKeyPress = keyCode => {
    if (keyCode === 13) {
      actions.createFeature();
    }
  };

  const handleRemoveFeature = index => {
    actions.removeFeature(index);
  };

  const handleChangeFeature = (index, value) => {
    if (index == -1) {
      setDefaulFeature(value);
    }
    actions.changeFeature({ index, value });
  };

  return (
    <Card>
      <CardHeader title="Tính năng sản phẩm" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          {_isEmpty(product.features) ? (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  placeholder="Mô tả tính năng"
                  value={defaultFeature}
                  onKeyDown={e => handleKeyPress(e.keyCode)}
                  onChange={e => handleChangeFeature(-1, e.target.value)}
                />
              </FormControl>
            </Grid>
          ) : (
            product.features.map((feature, index) => {
              return (
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      value={feature}
                      placeholder="Mô tả tính năng"
                      onKeyDown={e => handleKeyPress(e.keyCode)}
                      onChange={e => handleChangeFeature(index, e.target.value)}
                      autoFocus={index === product.features.length - 1}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleRemoveFeature(index)}
                            edge="end"
                          >
                            <RemoveIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              );
            })
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductFeatures);
