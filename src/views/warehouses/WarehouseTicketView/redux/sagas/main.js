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
  onSearchProducts
];
