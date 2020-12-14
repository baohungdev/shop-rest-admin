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
export const uploadImageSuccess = createAction(CONST.HANDLE_UPLOAD_IMAGE_FAIL);
export const uploadImageFail = createAction(CONST.HANDLE_UPLOAD_IMAGE_SUCCESS);
