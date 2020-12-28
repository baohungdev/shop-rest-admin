import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import Page from 'src/components/Page';
import ProductImage from './components/ProductImage';
import ProductImageList from './components/ProductImageList';
import ProductInfo from './components/ProductInfo';
import ProductCategory from './components/ProductCategory';
import ProductToolbar from './components/ProductToolbar';
import ProductStatus from './components/ProductStatus';
import ProductDimension from './components/ProductDimesion';

import {
  name,
  actions as newProductDetailActions
} from 'src/views/product/NewProductDetailView/redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const NewProductDetail = ({ actions, add, ...rest }) => {
  const classes = useStyles();

  useEffect(() => {
    return () => {
      actions.clearProductData();
    };
  }, []);

  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Backdrop
          className={classes.backdrop}
          open={rest.isAddingProductDetail}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <ProductToolbar />
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <ProductImage actions={actions} {...rest} />
          </Grid>
          <Grid item lg={9}>
            <ProductImageList images={add.imageUrls} actions={actions} />
          </Grid>
        </Grid>
        <Box mt={2} />
        <Grid container spacing={2}>
          <Grid item lg={8}>
            <ProductInfo />
            <Box mt={3} />
            <ProductDimension />
          </Grid>
          <Grid item lg={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ProductCategory />
              </Grid>
              <Grid item xs={12}>
                <ProductStatus />
              </Grid>
            </Grid>
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
  const actions = { ...newProductDetailActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewProductDetail)
);
