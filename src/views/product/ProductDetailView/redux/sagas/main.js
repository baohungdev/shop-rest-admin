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

function* handleUploadProductImages(action) {
  try {
    const response = yield call(API.uploadProductImages, action.payload);

    if (!response.success) {
      yield put(actions.uploadImageBatchFail(response));
      return;
    }

    yield put(actions.uploadImageBatchSuccess(response));
  } catch (err) {
    yield put(actions.uploadImageBatchFail(err));
  }
}

function* onFetchProductDetail() {
  yield takeAction(actions.fetchProductDetail, handleFetchProductDetail);
}

function* onUploadProductImages() {
  yield takeAction(actions.uploadImageBatch, handleUploadProductImages);
}

export default [onFetchProductDetail, onUploadProductImages];
