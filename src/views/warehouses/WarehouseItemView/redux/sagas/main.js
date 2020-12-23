import { call, put, throttle } from 'redux-saga/effects';
import * as actions from 'src/views/warehouses/WarehouseItemView/redux/actions';
import * as API from 'src/apis/warehouseItem';
import { takeAction } from 'src/services/forkActionSagas';
import * as CONST from 'src/views/warehouses/WarehouseItemView/redux/constants';

function* handleFetchWarehouseItems(action) {
  try {
    const response = yield call(API.fetchWarehouseItems, action.payload);

    if (!response.success) {
      yield put(actions.fetchWarehouseItemsFail(response));
      return;
    }

    yield put(actions.fetchWarehouseItemsSuccess(response));
  } catch (err) {
    yield put(actions.fetchWarehouseItemsFail(err));
  }
}

function* onSearchWarehouseItems() {
  yield throttle(
    500,
    CONST.HANDLE_SET_SEARCH_FOR_NAME,
    handleFetchWarehouseItems
  );
}

function* onSetLimit() {
  yield takeAction(actions.setLimit, handleFetchWarehouseItems);
}

function* onSetPage() {
  yield takeAction(actions.setPage, handleFetchWarehouseItems);
}

function* onFetchWarehouseItems() {
  yield takeAction(actions.fetchWarehouseItems, handleFetchWarehouseItems);
}

export default [
  onFetchWarehouseItems,
  onSearchWarehouseItems,
  onSetLimit,
  onSetPage
];
