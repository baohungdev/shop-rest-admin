import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const fetchCarts = createAction(CONST.HANDLE_FETCH_CART);
export const fetchCartsSuccess = createAction(CONST.HANDLE_FETCH_CART_SUCCESS);
export const fetchCartsFail = createAction(CONST.HANDLE_FETCH_CART_FAIL);

export const fetchCartDetail = createAction(CONST.HANDLE_FETCH_CART_SINGLE);
export const fetchCartDetailSuccess = createAction(
  CONST.HANDLE_FETCH_CART_SINGLE_SUCCESS
);
export const fetchCartDetailFail = createAction(
  CONST.HANDLE_FETCH_CART_SINGLE_FAIL
);

export const setLimit = createAction(CONST.HANDLE_SET_LIMIT);

export const setPage = createAction(CONST.HANDLE_SET_PAGE);
