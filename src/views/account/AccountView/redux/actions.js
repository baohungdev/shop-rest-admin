import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const fetchUserInfo = createAction(CONST.HANDLE_FETCH_USER_INFO);
export const fetchUserInfoFail = createAction(
  CONST.HANDLE_FETCH_USER_INFO_FAIL
);
export const fetchUserInfoSuccess = createAction(
  CONST.HANDLE_FETCH_USER_INFO_SUCCESS
);
