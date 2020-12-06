import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as API from '../../../../apis/auth';
import { save } from '../../../../services/localStoredService';
import { takeAction } from '../../../../services/forkActionSagas';

function* handleEmailLogin(action) {
  try {
    const response = yield call(API.emailLogin, action.payload.data);
    const { accessToken, refreshToken, userInfo } = response.data;
    save('refreshToken', refreshToken);
    save('accessToken', accessToken);
    save('userInfo', userInfo);

    yield put(actions.emailLoginSuccess(response));
    // yield put(wrapperActions.saveToken(accessToken));
    action.payload.history.push('/');
  } catch (err) {
    yield put(actions.emailLoginFail(err));
  }
}

function* emailLogin() {
  yield takeAction(actions.emailLogin, handleEmailLogin);
}

export default [emailLogin];
