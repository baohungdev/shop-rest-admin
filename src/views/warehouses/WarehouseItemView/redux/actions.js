import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const fetchWarehouseItems = createAction(
  CONST.HANDLE_FETCH_WAREHOUSE_ITEMS
);

export const fetchWarehouseItemsSuccess = createAction(
  CONST.HANDLE_FETCH_WAREHOUSE_ITEMS_SUCCESS
);

export const fetchWarehouseItemsFail = createAction(
  CONST.HANDLE_FETCH_WAREHOUSE_ITEMS_FAIL
);
