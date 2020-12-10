import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as API from '../../../../apis/auth';
import { save } from '../../../../services/localStoredService';
import { takeAction } from '../../../../services/forkActionSagas';
import { push } from 'connected-react-router';

function* handleEmailLogin(action) {
  try {
    const response = yield call(API.emailLogin, action.payload.data);

    if (!response.success) {
      yield put(actions.emailLoginFail(response));
      return;
    }

    const { accessToken, refreshToken, expiredAt } = response.data;
    save('refreshToken', refreshToken);
    save('accessToken', accessToken);
    save('expiredAt', expiredAt);

    yield put(actions.emailLoginSuccess(response));
    yield put(push('/'));
  } catch (err) {
    yield put(actions.emailLoginFail(err));
  }
}

function* emailLogin() {
  yield takeAction(actions.emailLogin, handleEmailLogin);
}

export default [emailLogin];
