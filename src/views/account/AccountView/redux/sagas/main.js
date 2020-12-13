import { call, put, takeEvery } from 'redux-saga/effects';
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
    console.log(err);
    yield put(actions.fetchUserInfoFail(err));
  }
}

function* onFetchUserInfo() {
  yield takeEvery(CONST.HANDLE_FETCH_USER_INFO, handleFetchUserInfo);
}

export default [onFetchUserInfo];
