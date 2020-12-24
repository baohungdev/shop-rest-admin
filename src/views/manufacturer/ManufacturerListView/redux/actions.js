import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const fetchManufacturer = createAction(CONST.HANDLE_FETCH_MANUFACTURER);

export const fetchManufacturerSuccess = createAction(
  CONST.HANDLE_FETCH_MANUFACTURER_SUCCESS
);

export const fetchManufacturerFail = createAction(
  CONST.HANDLE_FETCH_MANUFACTURER_FAIL
);

export const setLimit = createAction(CONST.HANDLE_SET_LIMIT);

export const setPage = createAction(CONST.HANDLE_SET_PAGE);
export const setSearchForName = createAction(CONST.HANDLE_SET_SEARCH_FOR_NAME);
