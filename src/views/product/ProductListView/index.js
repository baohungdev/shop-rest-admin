import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import SkeletonProductCard from './components/SkeletonProductCard';
import NoProduct from './components/NoProduct';

import {
  name,
  actions as productActions
} from 'src/views/product/ProductListView/redux';

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

const ProductList = ({
  actions,
  products,
  history,
  search,
  pagination,
  isLoadingProducts
}) => {
  const perpage = 20;
  const classes = useStyles();

  useEffect(() => {
    actions.fetchProductList({
      fetchParams: {
        page: 1,
        perpage
      },
      isVariant: false
    });
  }, []);

  return (
    <Page className={classes.root} title="Sản phẩm">
      <Container maxWidth={false}>
        <Toolbar
          actions={actions}
          search={search}
          pagination={pagination}
          history={history}
        />
        <Box mt={3}>
          <Grid container spacing={3}>
            {isLoadingProducts ? (
              <React.Fragment>
                {[...Array(6)].map(n => (
                  <Grid item key={n} lg={4} md={6} xs={12}>
                    <SkeletonProductCard />
                  </Grid>
                ))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {_isEmpty(products) ? <NoProduct /> : null}
                {products.map(product => (
                  <Grid item key={product.id} lg={4} md={6} xs={12}>
                    <ProductCard
                      history={history}
                      className={classes.productCard}
                      product={product}
                    />
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </Grid>
        </Box>
        {_isEmpty(products) ? null : (
          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              color="primary"
              count={pagination.total}
              page={pagination.current}
              onChange={(e, page) => {
                if (_isEmpty(search)) {
                  actions.fetchProductList({ fetchParams: { page, perpage } });
                } else {
                  actions.searchProduct({
                    search,
                    fetchParams: { page, perpage }
                  });
                }
              }}
              size="small"
            />
          </Box>
        )}
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
  const actions = { ...productActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);
