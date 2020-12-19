import { call, put } from 'redux-saga/effects';
import * as actions from 'src/views/product/ProductDetailView/redux/actions';
import * as API from 'src/apis/product';
import { takeAction } from 'src/services/forkActionSagas';
import { push } from 'connected-react-router';

function* handleSaveProduct(action) {
  try {
    const response = yield call(API.updateProductDetail, action.payload);

    if (!response.success) {
      yield put(actions.saveProductFail(response));
      return;
    }

    yield put(actions.saveProductSuccess(response));
    yield put(push('/app/products'));
  } catch (err) {
    yield put(actions.saveProductFail(err));
  }
}

function* handleFetchProductDetail(action) {
  try {
    const response = yield call(API.fetchProductDetail, action.payload.id);

    if (!response.success) {
      yield put(actions.fetchProductDetailFail(response));
      yield put(push('/error'));
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

function* handleFetchCategories(action) {
  try {
    const response = yield call(API.fetchCategories, action.payload);

    if (!response.success) {
      yield put(actions.fetchCategoriesFail(response));
      return;
    }

    yield put(actions.fetchCategoriesSuccess(response));
  } catch (err) {
    yield put(actions.fetchCategoriesFail(err));
  }
}

function* handleDeleteProduct(action) {
  try {
    const response = yield call(API.deleteProduct, action.payload);

    if (!response.success) {
      yield put(actions.deleteProductFail(response));
      return;
    }

    yield put(actions.deleteProductSuccess(response));
    yield put(push('/app/products'));
  } catch (err) {
    yield put(actions.deleteProductFail(err));
  }
}

function* onFetchProductDetail() {
  yield takeAction(actions.fetchProductDetail, handleFetchProductDetail);
}

function* onFetchCategories() {
  yield takeAction(actions.fetchCategories, handleFetchCategories);
}

function* onUploadProductImages() {
  yield takeAction(actions.uploadImageBatch, handleUploadProductImages);
}

function* onSaveProduct() {
  yield takeAction(actions.saveProduct, handleSaveProduct);
}

function* onDeleteProduct() {
  yield takeAction(actions.deleteProduct, handleDeleteProduct);
}

export default [
  onFetchProductDetail,
  onUploadProductImages,
  onFetchCategories,
  onSaveProduct,
  onDeleteProduct
];
