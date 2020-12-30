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

function* onFetchCart() {
  yield takeEvery(CONST.HANDLE_FETCH_CART, fetchCartsSaga);
}

function* onSetLimit() {
  yield takeAction(actions.setLimit, fetchCartsSaga);
}

function* onSetPage() {
  yield takeAction(actions.setPage, fetchCartsSaga);
}

export default [onFetchCart, onSetLimit, onSetPage];
