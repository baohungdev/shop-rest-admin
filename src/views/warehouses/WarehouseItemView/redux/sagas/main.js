import { call, put } from 'redux-saga/effects';
import * as actions from 'src/views/warehouses/WarehouseItemView/redux/actions';
import * as API from 'src/apis/warehouseItem';
import { takeAction } from 'src/services/forkActionSagas';

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

function* onFetchWarehouseItems() {
  yield takeAction(actions.fetchWarehouseItems, handleFetchWarehouseItems);
}

export default [onFetchWarehouseItems];
