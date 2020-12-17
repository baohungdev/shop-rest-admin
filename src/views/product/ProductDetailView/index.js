import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Box, Container, Grid, makeStyles, colors } from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import Page from 'src/components/Page';
import ProductImage from './components/ProductImage';
import ProductImageList from './components/ProductImageList';

import {
  name,
  actions as productDetailActions
} from 'src/views/product/ProductDetailView/redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ProductDetail = ({ actions, view }) => {
  const queries = new URLSearchParams(useLocation().search);
  const productId = queries.get('id') || null;

  useEffect(() => {
    actions.fetchProductDetail({ id: productId });
  }, []);

  const classes = useStyles();
  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <ProductImage />
          </Grid>
          <Grid item lg={9}>
            <ProductImageList
              images={_get(view, 'imageUrls')}
              actions={actions}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
);
