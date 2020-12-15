import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const fetchProductList = createAction(CONST.HANDLE_FETCH_PRODUCT_LIST);
export const fetchProductListSuccess = createAction(
  CONST.HANDLE_FETCH_PRODUCT_LIST_SUCCESS
);
export const fetchProductListFail = createAction(
  CONST.HANDLE_FETCH_PRODUCT_LIST_FAIL
);
