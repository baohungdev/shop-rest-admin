import { call, put, throttle } from 'redux-saga/effects';
import * as actions from 'src/views/manufacturer/ManufacturerListView/redux/actions';
import * as API from 'src/apis/manufacturer';
import * as APILocation from 'src/apis/location';
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

function* handleGetAllProvinces(action) {
  try {
    const response = yield call(APILocation.getAllProvinces, action.payload);

    if (!response.success) {
      yield put(actions.getAllProvincesFail(response));
      return;
    }

    yield put(actions.getAllProvincesSuccess(response));
  } catch (err) {
    yield put(actions.getAllProvincesFail(err));
  }
}

function* handleGetAllDistrict(action) {
  try {
    const response = yield call(APILocation.getAllDistricts, action.payload);

    if (!response.success) {
      yield put(actions.getAllDistrictsFail(response));
      return;
    }

    yield put(actions.getAllDistrictsSuccess(response));
  } catch (err) {
    yield put(actions.getAllDistrictsFail(err));
  }
}

function* handleGetAllWards(action) {
  try {
    const response = yield call(APILocation.getAllWards, action.payload);

    if (!response.success) {
      yield put(actions.getAllWardsFail(response));
      return;
    }

    yield put(actions.getAllWardsSuccess(response));
  } catch (err) {
    yield put(actions.getAllWardsFail(err));
  }
}

function* handleSaveOrUpdateManufacturer(action) {
  try {
    const { usedFor } = action.payload;

    let response = null;

    if (usedFor === 'update') {
      response = yield call(API.updateManufacturer, action.payload.data);
    } else {
      response = yield call(API.createManufacturer, action.payload.data);
    }

    if (!response.success) {
      yield put(actions.saveOrUpdateManufacturerFail(response));
      return;
    }

    yield put(actions.saveOrUpdateManufacturerSuccess(response));
    yield put(actions.showManufacturerInfo(false));
  } catch (err) {
    yield put(actions.saveOrUpdateManufacturerFail(err));
  }
}

function* handleGetDetailManufacturer(action) {
  try {
    const { manufacturerId } = action.payload;

    const response = yield call(API.getOneManufacturer, manufacturerId);

    if (!response.success) {
      yield put(actions.getDetailManufacturerFail(response));
      return;
    }

    yield put(actions.getDetailManufacturerSuccess(response));
  } catch (err) {
    yield put(actions.getDetailManufacturerFail(err));
  }
}

function* handleDeleteManufacturer(action) {
  try {
    const { manufacturerId } = action.payload;

    const response = yield call(API.deleteManufacturer, manufacturerId);

    if (!response.success) {
      yield put(actions.deleteManufacturerFail(response));
      return;
    }

    yield put(actions.deleteManufacturerSuccess(response));
  } catch (err) {
    yield put(actions.deleteManufacturerFail(err));
  }
}

function* onDeleteManufacturer() {
  yield takeAction(actions.deleteManufacturer, handleDeleteManufacturer);
}

function* onGetDetailManufacturer() {
  yield takeAction(actions.getDetailManufacturer, handleGetDetailManufacturer);
}

function* onSaveOrUpdateManufacturer() {
  yield takeAction(
    actions.saveOrUpdateManufacturer,
    handleSaveOrUpdateManufacturer
  );
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

function* onFetchAllProvinces() {
  yield takeAction(actions.getAllProvinces, handleGetAllProvinces);
}

function* onFetchAllDistricts() {
  yield takeAction(actions.getAllDistricts, handleGetAllDistrict);
}

function* onFetchAllWards() {
  yield takeAction(actions.getAllWards, handleGetAllWards);
}

export default [
  onFetchManufacturer,
  onSearchManufacturer,
  onSetLimit,
  onSetPage,
  onFetchAllProvinces,
  onFetchAllDistricts,
  onFetchAllWards,
  onSaveOrUpdateManufacturer,
  onGetDetailManufacturer,
  onDeleteManufacturer
];
