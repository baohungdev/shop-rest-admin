import { call, put, throttle } from 'redux-saga/effects';
import * as actions from 'src/views/warehouses/WarehouseTicketView/redux/actions';
import * as API from 'src/apis/warehouseTicket';
import { takeAction } from 'src/services/forkActionSagas';
import * as CONST from 'src/views/warehouses/WarehouseTicketView/redux/constants';

function* handleFetchWarehouseTransaction(action) {
  try {
    const response = yield call(API.fetchWarehouseTransactions, action.payload);

    if (!response.success) {
      yield put(actions.fetchWarehouseTransactionFail(response));
      return;
    }

    yield put(actions.fetchWarehouseTransactionSuccess(response));
  } catch (err) {
    yield put(actions.fetchWarehouseTransactionFail(err));
  }
}

function* onFetchWarehouseTransaction() {
  yield takeAction(
    actions.fetchWarehouseTransaction,
    handleFetchWarehouseTransaction
  );
}

export default [onFetchWarehouseTransaction];
