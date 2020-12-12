import { call, take, fork, takeLeading } from 'redux-saga/effects';

// eslint-disable-next-line import/prefer-default-export
export function* takeAction(pattern, saga, ...args) {
  const task = yield fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield call(saga, ...args.concat(action));
    }
  });
  return task;
}
