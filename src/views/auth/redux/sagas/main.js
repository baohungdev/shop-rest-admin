import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as actions from 'src/views/auth/redux/actions';
import * as API from 'src/apis/auth';
import { save } from 'src/services/localStoredService';
import { takeAction } from 'src/services/forkActionSagas';

function* handleEmailLogin(action) {
  try {
    const response = yield call(API.emailLogin, action.payload.data);

    if (!response.success) {
      yield put(actions.emailLoginFail(response));
      action.payload.updateStateOnFinish.map(o => o());
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
