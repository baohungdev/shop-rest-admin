import { call, put } from 'redux-saga/effects';
import * as actions from 'src/views/product/ProductDetailView/redux/actions';
import * as API from 'src/apis/product';
import { takeAction } from 'src/services/forkActionSagas';

function* handleFetchProductDetail(action) {
  try {
    const response = yield call(API.fetchProductDetail, action.payload.id);

    if (!response.success) {
      yield put(actions.fetchProductDetailFail(response));
      return;
    }

    yield put(actions.fetchProductDetailSuccess(response));
  } catch (err) {
    yield put(actions.fetchProductDetailFail(err));
  }
}

function* onFetchProductDetail() {
  yield takeAction(actions.fetchProductDetail, handleFetchProductDetail);
}

export default [onFetchProductDetail];
