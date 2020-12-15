import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const emailLogin = createAction(CONST.HANDLE_LOGIN_EMAIL);
export const emailLoginSuccess = createAction(CONST.HANDLE_LOGIN_EMAIL_SUCCESS);
export const emailLoginFail = createAction(CONST.HANDLE_LOGIN_EMAIL_FAIL);
export const closeSnackbar = createAction(CONST.HANDLE_CLOSE_SNACKBAR);
export const logout = createAction(CONST.HANDLE_LOGOUT);
