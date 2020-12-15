import { call, put, throttle } from 'redux-saga/effects';
import * as actions from 'src/views/product/ProductListView/redux/actions';
import * as CONST from 'src/views/product/ProductListView/redux/constants';
import * as API from 'src/apis/product';
import { takeAction } from 'src/services/forkActionSagas';

function* handleFetchProductList(action) {
  try {
    const response = yield call(API.fetchProductList, action.payload);

    if (!response.success) {
      yield put(actions.fetchProductListFail(response));
      return;
    }

    yield put(actions.fetchProductListSuccess(response));
  } catch (err) {
    yield put(actions.fetchProductListFail(err));
  }
}

function* handleSearchProduct(action) {
  try {
    const response = yield call(API.searchProduct, action.payload);

    if (!response.success) {
      yield put(actions.fetchProductListFail(response));
      return;
    }

    yield put(actions.fetchProductListSuccess(response));
  } catch (err) {
    yield put(actions.fetchProductListFail(err));
  }
}

function* onSearchProduct() {
  yield throttle(500, CONST.HANDLE_SEARCH_PRODUCT, handleSearchProduct);
}

function* onFetchProductList() {
  yield takeAction(actions.fetchProductList, handleFetchProductList);
}

export default [onFetchProductList, onSearchProduct];
