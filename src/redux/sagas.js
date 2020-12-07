import { all, fork } from 'redux-saga/effects';

import { sagas as LoginSagas } from '../views/auth/redux';

export const authSagas = [LoginSagas];

export default function* rootSaga() {
  yield all([...authSagas].map((saga) => fork(saga)));
}
