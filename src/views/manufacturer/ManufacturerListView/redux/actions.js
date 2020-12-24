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
export const showManufacturerInfo = createAction(
  CONST.HANDLE_SHOW_MANUFACTURER_INFO
);

export const getAllProvinces = createAction(CONST.HANDLE_GET_ALL_PROVINCES);
export const getAllProvincesSuccess = createAction(
  CONST.HANDLE_GET_ALL_PROVINCES_SUCCESS
);
export const getAllProvincesFail = createAction(
  CONST.HANDLE_GET_ALL_PROVINCES_FAIL
);

export const getAllDistricts = createAction(CONST.HANDLE_GET_ALL_DISTRICTS);
export const getAllDistrictsSuccess = createAction(
  CONST.HANDLE_GET_ALL_DISTRICTS_SUCCESS
);
export const getAllDistrictsFail = createAction(
  CONST.HANDLE_GET_ALL_DISTRICTS_FAIL
);

export const getAllWards = createAction(CONST.HANDLE_GET_ALL_WARDS);
export const getAllWardsSuccess = createAction(
  CONST.HANDLE_GET_ALL_WARDS_SUCCESS
);
export const getAllWardsFail = createAction(CONST.HANDLE_GET_ALL_WARDS_FAIL);
export const changeWard = createAction(CONST.HANDLE_CHANGE_WARD);
export const changeManufacturerInfo = createAction(
  CONST.HANDLE_CHANGE_MANUFACTURER_INFO
);

export const saveOrUpdateManufacturer = createAction(
  CONST.HANDLE_SAVE_UPDATE_MANUFACTURER_INFO
);

export const saveOrUpdateManufacturerSuccess = createAction(
  CONST.HANDLE_SAVE_UPDATE_MANUFACTURER_INFO_SUCCESS
);

export const saveOrUpdateManufacturerFail = createAction(
  CONST.HANDLE_SAVE_UPDATE_MANUFACTURER_INFO_FAIL
);

export const closeSnackbar = createAction(CONST.HANDLE_CLOSE_SNACKBAR);
export const getDetailManufacturer = createAction(
  CONST.HANDLE_GET_DETAIL_MANUFACTURER
);
export const getDetailManufacturerSuccess = createAction(
  CONST.HANDLE_GET_DETAIL_MANUFACTURER_SUCCESS
);
export const getDetailManufacturerFail = createAction(
  CONST.HANDLE_GET_DETAIL_MANUFACTURER_FAIL
);

export const deleteManufacturer = createAction(
  CONST.HANDLE_DELETE_MANUFACTURER
);

export const deleteManufacturerFail = createAction(
  CONST.HANDLE_DELETE_MANUFACTURER_FAIL
);

export const deleteManufacturerSuccess = createAction(
  CONST.HANDLE_DELETE_MANUFACTURER_SUCCESS
);
