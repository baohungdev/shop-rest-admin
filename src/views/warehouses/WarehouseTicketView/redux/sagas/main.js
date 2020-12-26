import { call, put, throttle } from 'redux-saga/effects';
import * as actions from 'src/views/warehouses/WarehouseTicketView/redux/actions';
import * as API from 'src/apis/warehouseTicket';
import { takeAction } from 'src/services/forkActionSagas';
import * as CONST from 'src/views/warehouses/WarehouseTicketView/redux/constants';
import { push } from 'connected-react-router';

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

function* handleFetchManufactures(action) {
  try {
    const response = yield call(API.fetchManufacturers, action.payload);

    if (!response.success) {
      yield put(actions.fetchManufacturersFail(response));
      return;
    }

    yield put(actions.fetchManufacturersSuccess(response));
  } catch (err) {
    yield put(actions.fetchManufacturersFail(err));
  }
}

function* handleFetchDetailWarehouseTransaction(action) {
  try {
    const response = yield call(
      API.fetchDetailWarehouseTransaction,
      action.payload
    );

    if (!response.success) {
      yield put(actions.fetchDetailWarehouseTransactionFail(response));
      return;
    }

    yield put(actions.fetchDetailWarehouseTransactionSuccess(response));
  } catch (err) {
    yield put(actions.fetchDetailWarehouseTransactionFail(err));
  }
}

function* handleFetchProducts(action) {
  try {
    const response = yield call(API.fetchProducts, action.payload);

    if (!response.success) {
      yield put(actions.fetchProductsFail(response));
      return;
    }

    yield put(actions.fetchProductsSuccess(response));
  } catch (err) {
    yield put(actions.fetchProductsFail(err));
  }
}

function* handleCreateNewWarehouseTransaction(action) {
  try {
    const response = yield call(
      API.createNewWarehouseTransaction,
      action.payload
    );

    if (!response.success) {
      yield put(actions.createNewWarehouseTransactionFail(response));
      return;
    }

    yield put(actions.createNewWarehouseTransactionSuccess(response));
    yield put(push('/app/warehouses/tickets'));
  } catch (err) {
    yield put(actions.createNewWarehouseTransactionFail(err));
  }
}

function* onFetchDetailWarehouseTransaction() {
  yield takeAction(
    actions.fetchDetailWarehouseTransaction,
    handleFetchDetailWarehouseTransaction
  );
}

function* onCreateNewWarehouseTransaction() {
  yield takeAction(
    actions.createNewWarehouseTransaction,
    handleCreateNewWarehouseTransaction
  );
}

function* onSearchManufacturer() {
  yield throttle(
    500,
    CONST.HANDLE_FETCH_MANUFACTURERS,
    handleFetchManufactures
  );
}

function* onSearchProducts() {
  yield throttle(500, CONST.HANDLE_FETCH_PRODUCTS, handleFetchProducts);
}

function* onSetLimit() {
  yield takeAction(actions.setLimit, handleFetchWarehouseTransaction);
}

function* onSetPage() {
  yield takeAction(actions.setPage, handleFetchWarehouseTransaction);
}

function* onFetchWarehouseTransaction() {
  yield takeAction(
    actions.fetchWarehouseTransaction,
    handleFetchWarehouseTransaction
  );
}

function* onChangeTabDisplay() {
  yield takeAction(actions.changeTabDisplay, handleFetchWarehouseTransaction);
}

export default [
  onFetchWarehouseTransaction,
  onSearchManufacturer,
  onSetLimit,
  onSetPage,
  onChangeTabDisplay,
  onSearchProducts,
  onCreateNewWarehouseTransaction,
  onFetchDetailWarehouseTransaction
];
