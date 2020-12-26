import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const fetchUserInfo = createAction(CONST.HANDLE_FETCH_USER_INFO);
export const fetchUserInfoFail = createAction(
  CONST.HANDLE_FETCH_USER_INFO_FAIL
);
export const fetchUserInfoSuccess = createAction(
  CONST.HANDLE_FETCH_USER_INFO_SUCCESS
);

export const updateUserInfo = createAction(CONST.HANDLE_UPDATE_USER_INFO);
export const updateUserInfoFail = createAction(
  CONST.HANDLE_UPDATE_USER_INFO_FAIL
);
export const updateUserInfoSuccess = createAction(
  CONST.HANDLE_UPDATE_USER_INFO_SUCCESS
);

export const closeSnackbar = createAction(CONST.HANDLE_CLOSE_SNACKBAR);
export const uploadImage = createAction(CONST.HANDLE_UPLOAD_IMAGE);
export const uploadImageSuccess = createAction(
  CONST.HANDLE_UPLOAD_IMAGE_SUCCESS
);
export const uploadImageFail = createAction(CONST.HANDLE_UPLOAD_IMAGE_FAIL);

export const updatePassword = createAction(CONST.HANDLE_UPDATE_PASSWORD);
export const updatePasswordSuccess = createAction(
  CONST.HANDLE_UPDATE_PASSWORD_SUCCESS
);
export const updatePasswordFail = createAction(
  CONST.HANDLE_UPDATE_PASSWORD_FAIL
);

export const changeName = createAction(CONST.HANDLE_CHANGE_NAME);
export const changeBirthDate = createAction(CONST.HANDLE_CHANGE_BIRTHDATE);
export const changeAddress = createAction(CONST.HANDLE_CHANGE_ADDRESS);
export const changePhone = createAction(CONST.HANDLE_CHANGE_PHONE);
export const changeGender = createAction(CONST.HANDLE_CHANGE_GENDER);
