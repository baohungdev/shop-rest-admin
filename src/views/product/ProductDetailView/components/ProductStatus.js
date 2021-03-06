import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import _map from 'lodash/map';
import _find from 'lodash/find';

import productStatusOptions from 'src/data/product';
import {
  name,
  actions as productDetailActions
} from 'src/views/product/ProductDetailView/redux';

const ProductStatus = ({ view: product, actions, isFetchingProduct }) => {
  return (
    <Card>
      <CardHeader title="Trạng thái sản phẩm" />
      <Divider />
      <CardContent>
        {isFetchingProduct ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
          </React.Fragment>
        ) : (
          <FormControl component="fieldset">
            <RadioGroup
              name="status"
              value={product.status || 0}
              onChange={e =>
                actions.changeProductStatus(Number(e.target.value))
              }
            >
              {productStatusOptions.map((option, index) => {
                return (
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        )}
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...productDetailActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductStatus);
