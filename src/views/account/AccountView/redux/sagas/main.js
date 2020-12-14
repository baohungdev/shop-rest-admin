import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { save } from 'src/services/localStoredService';
import * as actions from 'src/views/account/AccountView/redux/actions';
import * as CONST from 'src/views/account/AccountView/redux/constants';
import * as API from 'src/apis/account';

function* handleFetchUserInfo(action) {
  try {
    const response = yield call(API.fetchUserInfo);

    if (!response.success) {
      yield put(actions.fetchUserInfoFail(response));
      return;
    }

    yield put(actions.fetchUserInfoSuccess(response));
  } catch (err) {
    yield put(actions.fetchUserInfoFail(err));
  }
}

function* onFetchUserInfo() {
  yield takeEvery(CONST.HANDLE_FETCH_USER_INFO, handleFetchUserInfo);
}

function* handleUpdateUserInfo(action) {
  try {
    const response = yield call(API.updateUserInfo, action.payload.data);

    if (!response.success) {
      yield put(actions.updateUserInfoSuccess(response));
      save('userInfo', response.data);
      push('/app/account');
      return;
    }

    yield put(actions.updateUserInfoFail(response));
  } catch (err) {
    yield put(actions.updateUserInfoFail(err));
  }
}

function* onUpdateUserInfo() {
  yield takeEvery(CONST.HANDLE_UPDATE_USER_INFO, handleUpdateUserInfo);
}

export default [onFetchUserInfo, onUpdateUserInfo];
