import { call, put } from 'redux-saga/effects';
import * as actions from 'src/views/product/NewProductDetailView/redux/actions';
import * as API from 'src/apis/product';
import { takeAction } from 'src/services/forkActionSagas';
import { push } from 'connected-react-router';

function* handleAddProduct(action) {
  try {
    const response = yield call(API.addProductDetail, action.payload);

    if (!response.success) {
      yield put(actions.addProductFail(response));
      return;
    }

    yield put(actions.addProductSuccess(response));
    yield put(push('/app/products'));
  } catch (err) {
    yield put(actions.addProductFail(err));
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

function* handleCreateCategory(action) {
  try {
    const response = yield call(API.createCategory, action.payload);

    if (!response.success) {
      yield put(actions.createCategoryFail(response));
      return;
    }

    yield put(actions.createCategorySuccess(response));
    yield put(actions.fetchCategories());
  } catch (err) {
    yield put(actions.createCategoryFail(err));
  }
}

function* onCreateCategory() {
  yield takeAction(actions.createCategory, handleCreateCategory);
}

function* onFetchCategories() {
  yield takeAction(actions.fetchCategories, handleFetchCategories);
}

function* onUploadProductImages() {
  yield takeAction(actions.uploadImageBatch, handleUploadProductImages);
}

function* onAddProduct() {
  yield takeAction(actions.addProduct, handleAddProduct);
}

export default [
  onUploadProductImages,
  onFetchCategories,
  onAddProduct,
  onCreateCategory
];
