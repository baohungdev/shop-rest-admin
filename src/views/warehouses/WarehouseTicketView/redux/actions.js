import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const changeTabDisplay = createAction(CONST.HANDLE_CHANGE_TAB_DISPLAY);
export const fetchWarehouseTransaction = createAction(
  CONST.HANDLE_FETCH_WAREHOUSE_TRANSACTION
);
export const fetchWarehouseTransactionFail = createAction(
  CONST.HANDLE_FETCH_WAREHOUSE_TRANSACTION_FAIL
);
export const fetchWarehouseTransactionSuccess = createAction(
  CONST.HANDLE_FETCH_WAREHOUSE_TRANSACTION_SUCCESS
);
