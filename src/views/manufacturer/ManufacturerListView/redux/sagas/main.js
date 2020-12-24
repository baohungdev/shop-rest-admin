import { call, put, throttle } from 'redux-saga/effects';
import * as actions from 'src/views/manufacturer/ManufacturerListView/redux/actions';
import * as API from 'src/apis/manufacturer';
import { takeAction } from 'src/services/forkActionSagas';
import * as CONST from 'src/views/manufacturer/ManufacturerListView/redux/constants';

function* handleFetchManufacturer(action) {
  try {
    const response = yield call(API.fetchAllManufacturer, action.payload);

    if (!response.success) {
      yield put(actions.fetchManufacturerFail(response));
      return;
    }

    yield put(actions.fetchManufacturerSuccess(response));
  } catch (err) {
    yield put(actions.fetchManufacturerFail(err));
  }
}

function* onSearchManufacturer() {
  yield throttle(
    500,
    CONST.HANDLE_SET_SEARCH_FOR_NAME,
    handleFetchManufacturer
  );
}

function* onSetLimit() {
  yield takeAction(actions.setLimit, handleFetchManufacturer);
}

function* onSetPage() {
  yield takeAction(actions.setPage, handleFetchManufacturer);
}

function* onFetchManufacturer() {
  yield takeAction(actions.fetchManufacturer, handleFetchManufacturer);
}

export default [
  onFetchManufacturer,
  onSearchManufacturer,
  onSetLimit,
  onSetPage
];
