import React, { lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import checkForLoggedIn from 'src/utils/checkForLoggedIn';
import { store } from 'src/AppRenderer';

import {
  name as nameOfProductDetail,
  sagas as productDetailSagas
} from 'src/views/product/ProductDetailView/redux';

import {
  name as nameOfNewProductDetail,
  sagas as newProductDetailSagas
} from 'src/views/product/NewProductDetailView/redux';

import {
  name as nameOfProduct,
  sagas as productSagas
} from 'src/views/product/ProductListView/redux';

const ProductDetailView = lazy(() =>
  import('./ProductDetailView').then(module => {
    store.injectSaga(nameOfProductDetail, productDetailSagas);
    return module;
  })
);

const NewProductDetailView = lazy(() =>
  import('./NewProductDetailView').then(module => {
    store.injectSaga(nameOfNewProductDetail, newProductDetailSagas);
    return module;
  })
);

const ProductListView = lazy(() =>
  import('./ProductListView').then(module => {
    store.injectSaga(nameOfProduct, productSagas);
    return module;
  })
);

const ProductContainer = () => {
  return (
    <React.Fragment>
      {checkForLoggedIn() ? (
        <Switch>
          <ProductListView path="/app/products" exact />
          <ProductDetailView path="/app/products/view" exact />
          <NewProductDetailView path="/app/products/new" exact />
          <Redirect to="/app/dashboard" />
        </Switch>
      ) : (
        <Redirect to="/login" />
      )}
    </React.Fragment>
  );
};

export default ProductContainer;
