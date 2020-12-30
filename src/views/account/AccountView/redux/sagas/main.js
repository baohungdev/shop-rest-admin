import { call, put, takeEvery, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { save, clearAll } from 'src/services/localStoredService';
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

function* handleUpdateUserInfo(action) {
  try {
    const response = yield call(API.updateUserInfo, action.payload.data);

    if (!response.success) {
      yield put(actions.updateUserInfoFail(response));
      return;
    }

    yield put(actions.updateUserInfoSuccess(response));
    save('userInfo', response.data);
    yield put(push('/app/account'));
  } catch (err) {
    yield put(actions.updateUserInfoFail(err));
  }
}

function* handleLogout(action) {
  try {
    yield call(clearAll);
    yield put(push('/login'));
  } catch (err) {}
}

function* handleUploadImage(action) {
  try {
    const response = yield call(API.uploadImage, action.payload);

    if (!response.success) {
      yield put(actions.uploadImageFail(response));
      return;
    }

    yield put(actions.uploadImageSuccess(response));
    const userInfo = yield select(state => state.Account.userInfo); // <-- get the project
    yield put(
      actions.updateUserInfo({
        data: {
          name: userInfo.name,
          birthDate: userInfo.birthDate,
          gender: userInfo.gender,
          address: userInfo.address,
          phone: userInfo.phone,
          avatar: userInfo.avatar
        }
      })
    );
  } catch (err) {
    console.log(err);
    yield put(actions.uploadImageFail(err));
  }
}

function* handleUpdatePassword(action) {
  try {
    const response = yield call(API.updatePassword, action.payload);

    if (!response.success) {
      yield put(actions.updatePasswordFail(response));
      return;
    }

    yield put(actions.updatePasswordSuccess(response));
  } catch (err) {
    yield put(actions.updatePasswordFail(err));
  }
}

function* onUpdateUserInfo() {
  yield takeEvery(CONST.HANDLE_UPDATE_USER_INFO, handleUpdateUserInfo);
}

function* onFetchUserInfo() {
  yield takeEvery(CONST.HANDLE_FETCH_USER_INFO, handleFetchUserInfo);
}

function* onUploadImage() {
  yield takeEvery(CONST.HANDLE_UPLOAD_IMAGE, handleUploadImage);
}

function* onUpdatePassword() {
  yield takeEvery(CONST.HANDLE_UPDATE_PASSWORD, handleUpdatePassword);
}

function* onLogout() {
  yield takeEvery(CONST.HANDLE_LOGOUT, handleLogout);
}

export default [
  onFetchUserInfo,
  onUpdateUserInfo,
  onUploadImage,
  onUpdatePassword,
  onLogout
];
