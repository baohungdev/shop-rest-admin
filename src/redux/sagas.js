import { all, fork } from 'redux-saga/effects';

import { sagas as LoginSagas } from 'src/views/auth/redux';
import { sagas as AccountSagas } from 'src/views/account/AccountView/redux';

export const authSagas = [LoginSagas];
export const accountSagas = [];

export default function* rootSaga() {
  yield all([]);
  // yield all([...authSagas, ...accountSagas].map(saga => fork(saga)));
}
