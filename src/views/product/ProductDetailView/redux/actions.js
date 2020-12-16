import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const fetchProductDetail = createAction(
  CONST.HANDLE_FETCH_PRODUCT_DETAIL
);

export const fetchProductDetailSuccess = createAction(
  CONST.HANDLE_FETCH_PRODUCT_DETAIL_SUCCESS
);

export const fetchProductDetailFail = createAction(
  CONST.HANDLE_FETCH_PRODUCT_DETAIL_FAIL
);
