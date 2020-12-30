import { call, put, takeEvery, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { save } from 'src/services/localStoredService';
import * as actions from 'src/views/carts/redux/actions';
import { takeAction } from 'src/services/forkActionSagas';
import * as CONST from 'src/views/carts/redux/constants';
import * as API from 'src/apis/cart';

function* fetchCartsSaga(action) {
  try {
    const response = yield call(API.getAllCarts, action.payload);

    if (!response.success) {
      yield put(actions.fetchCartsFail(response));
      return;
    }

    yield put(actions.fetchCartsSuccess(response));
  } catch (err) {
    yield put(actions.fetchCartsFail(err));
  }
}

function* fetchCartDetailSaga(action) {
  try {
    const response = yield call(API.getCartDetail, action.payload);

    if (!response.success) {
      yield put(actions.fetchCartDetailFail(response));
      return;
    }

    yield put(actions.fetchCartDetailSuccess(response));
  } catch (err) {
    yield put(actions.fetchCartDetailFail(err));
  }
}

function* updateCartStatusSaga(action) {
  try {
    const response = yield call(API.updateCartStatus, action.payload);

    if (!response.success) {
      yield put(actions.updateCartStatusFail(response));
      return;
    }

    yield put(actions.updateCartStatusSuccess(response));
    yield put(push('/app/carts'));
  } catch (err) {
    yield put(actions.updateCartStatusFail(err));
  }
}

function* onFetchCart() {
  yield takeEvery(CONST.HANDLE_FETCH_CART, fetchCartsSaga);
}

function* onSetLimit() {
  yield takeAction(actions.setLimit, fetchCartsSaga);
}

function* onFetchCartDetail() {
  yield takeAction(actions.fetchCartDetail, fetchCartDetailSaga);
}

function* onSetPage() {
  yield takeAction(actions.setPage, fetchCartsSaga);
}

function* onUpdateCartStatusSaga() {
  yield takeAction(actions.updateCartStatus, updateCartStatusSaga);
}

export default [
  onFetchCart,
  onSetLimit,
  onSetPage,
  onFetchCartDetail,
  onUpdateCartStatusSaga
];
