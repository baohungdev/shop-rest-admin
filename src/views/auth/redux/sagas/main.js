import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as API from '../../../../apis/auth';
import { save } from '../../../../services/localStoredService';

function* handleEmailLogin(action) {
  try {
    const response = yield call(API.emailLogin, action.payload.data);
    const { accessToken, refreshToken, userInfo } = response.data;
    save('refreshToken', refreshToken);
    save('accessToken', accessToken);
    save('userInfo', userInfo);

    yield put(actions.emailLoginSuccess(response.data));
    // yield put(wrapperActions.saveToken(accessToken));
    action.payload.history.push('/');
  } catch (err) {
    yield put(actions.emailLoginFail(err));
  }
}

export default [handleEmailLogin];
