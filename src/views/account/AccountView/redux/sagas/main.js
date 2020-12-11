import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as actions from 'src/views/account/AccountView/redux/actions';
import * as API from 'src/apis/account';
import { save } from 'src/services/localStoredService';
import { takeAction } from 'src/services/forkActionSagas';

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
  yield takeAction(actions.fetchUserInfo, handleFetchUserInfo);
}

export default [onFetchUserInfo];
