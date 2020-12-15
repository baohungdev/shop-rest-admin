import { call, put } from 'redux-saga/effects';
import * as actions from 'src/views/product/ProductListView/redux/actions';
import * as API from 'src/apis/product';
import { takeAction } from 'src/services/forkActionSagas';

function* handleFetchProductList(action) {
  try {
    const response = yield call(
      API.fetchProductList,
      action.payload.fetchParams
    );

    if (!response.success) {
      yield put(actions.fetchProductListFail(response));
      return;
    }

    yield put(actions.fetchProductListSuccess(response));
  } catch (err) {
    yield put(actions.fetchProductListFail(err));
  }
}

function* onFetchProductList() {
  yield takeAction(actions.fetchProductList, handleFetchProductList);
}

export default [onFetchProductList];
